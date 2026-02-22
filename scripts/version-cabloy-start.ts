import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fse from 'fs-extra';

async function versionTemplate() {
  // cp cabloy-start
  const suiteHomeSrc = path.resolve(fileURLToPath(import.meta.url), '../../src/suite/cabloy-start');
  const suiteHomeDest = path.resolve(fileURLToPath(import.meta.url), '../../packages-cli/cli-set-api/cli/templates/create/project/basic/boilerplate/src/suite/cabloy-start');
  await fse.remove(suiteHomeDest);
  await fse.copy(suiteHomeSrc, suiteHomeDest);
  for (const moduleName of ['start-home', 'start-test']) {
    await fse.remove(path.join(suiteHomeDest, `modules/${moduleName}/dist`));
    await fse.remove(path.join(suiteHomeDest, `modules/${moduleName}/tsconfig.build.tsbuildinfo`));
  }
}

versionTemplate();
