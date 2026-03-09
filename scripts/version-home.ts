import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fse from 'fs-extra';
import { removeSpecialFiles } from './utils.ts';

async function _versionTemplate(templateName: string) {
  // cp a-home
  const suiteHomeSrc = path.resolve(fileURLToPath(import.meta.url), '../../src/suite/a-home');
  const suiteHomeDest = path.resolve(fileURLToPath(import.meta.url), `../../packages-cli/cli-set-api/cli/templates/create/project/${templateName}/boilerplate/src/suite/a-home`);
  await fse.remove(suiteHomeDest);
  await fse.copy(suiteHomeSrc, suiteHomeDest);
  await fse.remove(path.join(suiteHomeDest, 'node_modules'));
  for (const moduleName of ['home-base', 'home-index', 'home-user']) {
    await removeSpecialFiles(suiteHomeDest,moduleName);
  }
}

async function versionTemplates() {
   await _versionTemplate('cabloy-basic');
   await _versionTemplate('cabloy-start');
}

versionTemplates();
