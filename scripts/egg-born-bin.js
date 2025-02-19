import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

// egg-born-bin
const pathEggBornBin = __getPathEggBornBin();
if (!pathEggBornBin) {
  process.exit(0);
}
const require = createRequire(import.meta.url);
require(pathEggBornBin);

function __getPathEggBornBin() {
  const basePath = path.join(import.meta.dirname, '../');
  let cabloyPath = path.join(basePath, 'node_modules/egg-born-bin/bin/egg-born-bin.js');
  if (fs.existsSync(cabloyPath))
    return cabloyPath;
  cabloyPath = path.join(basePath, 'packages-egg-born/egg-born-bin/bin/egg-born-bin.js');
  if (fs.existsSync(cabloyPath))
    return cabloyPath;
  return null;
}
