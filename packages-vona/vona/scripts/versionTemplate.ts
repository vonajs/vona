import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

async function versionTemplate() {
  // version
  const pkgFileCurrent = path.resolve(fileURLToPath(import.meta.url), '../../package.json');
  const pkgContentCurrent = (await fs.readFile(pkgFileCurrent)).toString();
  const version = pkgContentCurrent.match(/"version": "([^"]*)"/)![1];
  // change
  const pkgFile = path.resolve(fileURLToPath(import.meta.url), '../../../../packages-cli/cli-set-api/cli/templates/create/project/basic/boilerplate/package.original.json');
  let pkgContent = (await fs.readFile(pkgFile)).toString();
  pkgContent = pkgContent.replace(/"vona": "\^([^"]*)"/, () => {
    return `"vona": "^${version}"`;
  });
  fs.writeFile(pkgFile, pkgContent);
}

versionTemplate();
