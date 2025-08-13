import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync, statSync } from 'node:fs';
import path from 'node:path';

/**
 * Formats the target directory path by trimming whitespace and removing trailing slashes
 * @param targetDir - The directory path to format
 * @returns The formatted directory path
 */
export function formatTargetDir(targetDir: string) {
  return targetDir.trim()?.replace(/\/+$/g, '');
}

/**
 * Checks if a directory path is empty or contains only a .git folder
 * @param $path - The directory path to check
 * @returns True if the directory is empty or only contains .git folder
 */
export function isPathEmpty($path: string) {
  const files = readdirSync($path);
  return files.length === 0 || (files.length === 1 && files[0] === '.git');
}

/**
 * Validates if a string is a valid npm package name
 * @param projectName - The name to validate
 * @returns True if the name is a valid npm package name
 */
export function isValidPackageName(projectName: string) {
  return /^(?:@[a-z\d\-*~][a-z\d\-*._~]*\/)?[a-z\d\-~][a-z\d\-._~]*$/.test(projectName);
}

/**
 * Converts a string into a valid npm package name by:
 * - Converting to lowercase
 * - Replacing spaces with hyphens
 * - Removing leading dots/underscores
 * - Replacing invalid characters with hyphens
 * @param projectName - The name to convert
 * @returns A valid npm package name
 */
export function toValidPackageName(projectName: string) {
  return projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/^[._]/, '')
    .replace(/[^a-z\d\-~]+/g, '-');
}

/**
 * Empties a directory by removing all its contents except the .git folder
 * @param dir - The directory path to empty
 */
export function emptyDir(dir: string) {
  const isExist = existsSync(dir);

  if (!isExist) {
    return;
  }

  const files = readdirSync(dir);

  for (const file of files) {
    if (file !== '.git') {
      const filePath = path.resolve(dir, file);

      rmSync(filePath, { force: true, recursive: true });
    }
  }
}

/**
 * Recursively copies a directory and its contents
 * @param srcDir - Source directory path
 * @param destDir - Destination directory path
 */
function copyDir(srcDir: string, destDir: string) {
  mkdirSync(destDir, { recursive: true });

  const files = readdirSync(srcDir);

  for (const file of files) {
    const srcFile = path.resolve(srcDir, file);
    const destFile = path.resolve(destDir, file);

    copy(srcFile, destFile);
  }
}

/**
 * Copies a file or directory from source to destination
 * @param src - Source path
 * @param dest - Destination path
 */
export function copy(src: string, dest: string) {
  const stat = statSync(src);

  if (stat.isDirectory()) {
    copyDir(src, dest);
  } else {
    copyFileSync(src, dest);
  }
}

interface PkgInfo {
  name: string;
  version: string;
}

export function pkgFromUserAgent(userAgent: string | undefined): PkgInfo | undefined {
  if (!userAgent) return undefined;
  const pkgSpec = userAgent.split(' ')[0];
  const pkgSpecArr = pkgSpec.split('/');

  return {
    name: pkgSpecArr[0],
    version: pkgSpecArr[1]
  };
}

export function isEmpty(dir: string) {
  const files = readdirSync(dir);

  return files.length === 0 || (files.length === 1 && files[0] === '.git');
}
