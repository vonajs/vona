import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fse from 'fs-extra';

async function _versionTemplate(templateName: string) {
  // cp cabloy-start
  const suiteHomeSrc = path.resolve(fileURLToPath(import.meta.url), '../../src/suite/cabloy-basic');
  const suiteHomeDest = path.resolve(fileURLToPath(import.meta.url), `../../packages-cli/cli-set-api/cli/templates/create/project/${templateName}/boilerplate/src/suite/cabloy-basic`);
  await fse.remove(suiteHomeDest);
  await fse.copy(suiteHomeSrc, suiteHomeDest);
  for (const moduleName of ['basic-siteadmin']) {
    await fse.remove(path.join(suiteHomeDest, `modules/${moduleName}/dist`));
    await fse.remove(path.join(suiteHomeDest, `modules/${moduleName}/tsconfig.build.tsbuildinfo`));
  }
}

async function versionTemplates() {
   await _versionTemplate('cabloy-basic');
}


versionTemplates();
