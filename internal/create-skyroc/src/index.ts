#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { basename, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import * as prompts from '@clack/prompts';
import { consola } from 'consola';
import { cyan, green, reset, yellow } from 'kolorist';
import mri from 'mri';

import { installDeps, printNextSteps, runDev } from './installUtils';
import type { PMName } from './installUtils';
import {
  copy,
  emptyDir,
  formatTargetDir,
  isEmpty,
  isValidPackageName,
  pkgFromUserAgent,
  toValidPackageName
} from './shared';

type TemplateType = 'ui-primitives';

type ColorFunc = (str: string | number) => string;

interface Template {
  color: ColorFunc;
  name: string;
  type: TemplateType;
}

interface Args {
  help?: boolean;
  install?: boolean;
  overwrite?: boolean;
  pm?: PMName;
  'run-dev'?: boolean;
  template?: string;
}

const templates: Template[] = [
  {
    color: green,
    name: 'UI Primitives',
    type: 'ui-primitives'
  }
];

const TEMPLATES = templates.map(t => t.type);

const renameFiles: Record<string, string | undefined> = {
  _gitignore: '.gitignore'
};

const argv = mri<Args>(process.argv.slice(2), {
  alias: { h: 'help', i: 'install', t: 'template' },
  boolean: ['help', 'overwrite', 'install', 'run-dev'],
  string: ['template', 'pm']
});

const cwd = process.cwd();

// prettier-ignore
const helpMessage = `\
Usage: create-vite [OPTION]... [DIRECTORY]

Create a new Vite project in JavaScript or TypeScript.
With no arguments, start the CLI in interactive mode.

Options:
  -t, --template NAME        use a specific template

Available templates:
${yellow    ('vanilla-ts     vanilla'  )}
${green     ('vue-ts         vue'      )}
${cyan      ('react-ts       react'    )}
${cyan      ('react-swc-ts   react-swc')}`

const defaultTargetDir = 'skyroc-project';

// eslint-disable-next-line complexity
async function setupCli() {
  const help = argv.help;

  if (help) {
    console.log(helpMessage);

    return;
  }

  const argTargetDir = argv._[0] ? formatTargetDir(String(argv._[0])) : undefined;

  const argTemplate = argv.template;

  const argOverwrite = argv.overwrite;

  const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent);

  const cancel = () => prompts.cancel('Operation cancelled');

  // 1. Get project name and target dir
  let targetDir = argTargetDir;

  if (!targetDir) {
    const projectName = await prompts.text({
      defaultValue: defaultTargetDir,
      message: 'Project name:',
      placeholder: defaultTargetDir,
      validate: value => {
        if (!value) return 'Invalid project name';

        const formatted = formatTargetDir(value);

        return formatted && formatted.length > 0 ? undefined : 'Invalid project name';
      }
    });

    // eslint-disable-next-line consistent-return
    if (prompts.isCancel(projectName)) return cancel();

    targetDir = formatTargetDir(projectName);
  }

  // 2. Handle directory if exist and not empty
  if (existsSync(targetDir) && !isEmpty(targetDir)) {
    const overwrite = argOverwrite
      ? 'yes'
      : await prompts.select({
          message: `${
            targetDir === '.' ? 'Current directory' : `Target directory "${targetDir}"`
          } is not empty. Please choose how to proceed:`,
          options: [
            {
              label: 'Cancel operation',
              value: 'no'
            },
            {
              label: 'Remove existing files and continue',
              value: 'yes'
            },
            {
              label: 'Ignore files and continue',
              value: 'ignore'
            }
          ]
        });

    // eslint-disable-next-line consistent-return
    if (prompts.isCancel(overwrite)) return cancel();

    switch (overwrite) {
      case 'yes':
        emptyDir(targetDir);
        break;
      case 'no':
        cancel();
        return;
      default:
        break;
    }
  }

  // 3. Get package name
  let packageName = basename(resolve(targetDir));

  if (!isValidPackageName(packageName)) {
    const packageNameResult = await prompts.text({
      defaultValue: toValidPackageName(packageName),
      message: reset('Package name:'),
      placeholder: toValidPackageName(packageName),
      validate: dir => {
        if (!isValidPackageName(dir)) {
          return 'Invalid package.json name';
        }

        return undefined;
      }
    });

    // eslint-disable-next-line consistent-return
    if (prompts.isCancel(packageNameResult)) return cancel();
    packageName = packageNameResult;
  }

  // 4. Choose a framework and variant
  let template = argTemplate;

  let hasInvalidArgTemplate = false;

  if (argTemplate && !TEMPLATES.includes(argTemplate as TemplateType)) {
    template = undefined;
    hasInvalidArgTemplate = true;
  }

  if (!template) {
    const framework = await prompts.select({
      message: hasInvalidArgTemplate
        ? `"${argTemplate}" isn't a valid template. Please choose from below: `
        : 'Select a framework:',

      options: templates.map(t => {
        const templateColor = t.color;

        return {
          label: templateColor(t.name),
          value: t.type
        };
      })
    });

    // eslint-disable-next-line consistent-return
    if (prompts.isCancel(framework)) return cancel();

    template = framework;
  }

  const root = join(cwd, targetDir);

  mkdirSync(root, { recursive: true });

  // 5. Create project

  prompts.log.step(`Scaffolding project in ${root}...`);

  const templateDir = resolve(fileURLToPath(import.meta.url), '../..', `template-${template}`);

  const write = (file: string, content?: string) => {
    const targetPath = join(root, renameFiles[file] ?? file);

    if (content) {
      writeFileSync(targetPath, content);
    } else {
      copy(join(templateDir, file), targetPath);
    }
  };

  const files = readdirSync(templateDir);

  for (const file of files.filter(f => f !== 'package.json')) {
    write(file);
  }

  const pkg = JSON.parse(readFileSync(join(templateDir, `package.json`), 'utf-8'));

  pkg.name = packageName;

  write('package.json', `${JSON.stringify(pkg, null, 2)}\n`);

  const pkgManager = argv.pm || pkgInfo ? pkgInfo?.name : 'npm';

  let shouldInstall = false;

  if (argv.install) {
    shouldInstall = true;
  } else {
    const confirmed = await prompts.confirm({
      initialValue: true,
      message: `Install dependencies with ${pkgManager}?`
    });

    // eslint-disable-next-line consistent-return
    if (prompts.isCancel(confirmed)) return cancel();

    shouldInstall = confirmed;
  }

  if (shouldInstall) {
    await installDeps(root, pkgManager as PMName);

    let shouldRunDev = Boolean(argv['run-dev']);

    if (!shouldRunDev) {
      const confirmedRun = await prompts.confirm({
        initialValue: false,
        message: 'Run dev server now?'
      });

      // eslint-disable-next-line consistent-return
      if (prompts.isCancel(confirmedRun)) return cancel();

      shouldRunDev = confirmedRun;
    }

    if (shouldRunDev) {
      await runDev(root, pkgManager as PMName);
    }
  } else {
    printNextSteps(root, pkgManager as PMName, packageName);
  }

  const cdProjectName = relative(cwd, root);

  if (root !== cwd) {
    consola.info(`  cd ${cdProjectName.includes(' ') ? `"${cdProjectName}"` : cdProjectName}`);
  }
}

setupCli().catch(err => {
  console.error(err);

  process.exit(1);
});
