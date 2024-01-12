const fse = require('fs-extra');
const { ProcessHelper } = require('@cabloy/process-helper');
const mglob = require('@cabloy/module-glob').default;
const eggBornUtils = require('egg-born-utils');
const argv = require('./lib/parse_argv')('sync');

(async function () {
  await main();
})();

async function main() {
  // message
  const message = argv.args[0];
  const processHelper = new ProcessHelper(process.cwd());

  // modules
  const { modulesArray } = mglob.glob({
    projectPath: process.cwd(),
    disabledModules: null,
    disabledSuites: null,
    log: true,
    type: 'backend',
  });

  // loop
  for (const module of modulesArray) {
    await _moduleHandle({ module });
  }
}

async function _moduleHandle({ module }) {
  // await _moduleRemoveFront({ module });
}

async function _moduleRemoveFront({ module }) {
  // console.log(module);
  // front/icons/src
  // await fse.remove(`${module.root}/front`);
  // await fse.remove(`${module.root}/icons`);
  // await fse.remove(`${module.root}/src`);
  // backend->root
  // files
  // const files = await eggBornUtils.tools.globbyAsync(`*`, {
  //   expandDirectories: false,
  //   onlyFiles: false,
  //   absolute: false,
  //   cwd: `${module.root}/backend`,
  // });
  // console.log(files);
  // for (const file of files) {
  //   await fse.move(`${module.root}/backend/${file}`, `${module.root}/${file}`);
  // }
  // await fse.remove(`${module.root}/backend`);
}
