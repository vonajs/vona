import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fse from 'fs-extra';

async function versionTemplate() {
  // cp a-home
  const suiteHomeSrc = path.resolve(fileURLToPath(import.meta.url), '../../src/suite/a-home');
  const suiteHomeDest = path.resolve(fileURLToPath(import.meta.url), '../../packages-cli/cli-set-api/cli/templates/create/project/basic/boilerplate/src/suite/a-home');
  await fse.remove(suiteHomeDest);
  await fse.copy(suiteHomeSrc, suiteHomeDest);
  for (const moduleName of ['home-base', 'home-index', 'home-user']) {
    await fse.remove(path.join(suiteHomeDest, `modules/${moduleName}/dist`));
    await fse.remove(path.join(suiteHomeDest, `modules/${moduleName}/tsconfig.build.tsbuildinfo`));
  }
}

versionTemplate();
