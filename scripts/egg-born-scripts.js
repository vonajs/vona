const fs = require('node:fs');
const path = require('node:path');

// egg-born-scripts
const pathEggBornBin = __getPathEggBornBin();
if (!pathEggBornBin) {
  process.exit(0);
}
require(pathEggBornBin);

function __getPathEggBornBin() {
  const basePath = path.join(__dirname, '../');
  let cabloyPath = path.join(basePath, 'node_modules/egg-born-scripts/bin/egg-born-scripts.js');
  if (fs.existsSync(cabloyPath))
    return cabloyPath;
  cabloyPath = path.join(basePath, 'packages-egg-born/egg-born-scripts/bin/egg-born-scripts.js');
  if (fs.existsSync(cabloyPath))
    return cabloyPath;
  return null;
}
