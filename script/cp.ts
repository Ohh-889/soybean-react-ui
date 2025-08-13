import { execSync } from 'node:child_process';

const name = process.argv[2];

if (!name) {
  console.error('please provide the component name, like: pnpm cp button');

  process.exit(1);
}

execSync(`pnpm create-skyroc primitives/${name} --template ui-primitives --install`, {
  stdio: 'inherit'
});
