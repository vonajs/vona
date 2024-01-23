const fse = require('fs-extra');
const fs = require('node:fs/promises');
const { ProcessHelper } = require('@cabloy/process-helper');
const { glob } = require('@cabloy/module-glob');
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
  const { modules, modulesArray, suites } = await glob({
    projectPath: process.cwd(),
    disabledModules: null,
    disabledSuites: null,
    log: true,
    type: 'backend',
  });
  console.log('modules: ', modulesArray.length);

  // loop suites
  for (const key in suites) {
    const suite = suites[key];
    await _suiteHandle({ modules, suite, processHelper });
  }

  // loop modules
  for (const module of modulesArray) {
    await _moduleHandle({ module, processHelper });
  }
}

async function _suiteHandle({ modules, suite, processHelper }) {
  // const refs = [];
  // for (const moduleName of suite.modules) {
  //   const module = modules[moduleName];
  //   console.log(module.package.name);
  //   refs.push(`import '${module.package.name}';`);
  // }
  // const indexjs = refs.join('\n');
  // console.log(indexjs);
  // const outFileName = `${suite.root}/src/index.ts`;
  // await fse.outputFile(outFileName, indexjs);
  // await processHelper.formatFile({ fileName: outFileName });
  // const pkg = require(suite.root);
  // let dependencies = pkg.dependencies;
  // if (!dependencies) {
  //   dependencies = pkg.dependencies = {};
  // }
  // console.log(dependencies);
  // await fse.outputFile(suite.pkg, JSON.stringify(pkg, null, 2));
  // console.log(pkg.name);
}

// * 将require替换为import
// const (\S*) = require\((\S*)\);
// import $1 from $2;

// * module.exports =
// module.exports = \[([\s\S\n]*)\]
// import { IModuleRoute } from '@cabloy/core';
// export const routes: IModuleRoute[] = [];

//

async function _moduleHandle({ module, processHelper }) {
  // ------ src/resource/this.ts
  const outFileName = `${module.root}/src/resource/this.ts`;
  if (!fse.existsSync(outFileName)) {
    const typings = `export const __ThisModule__ = '${module.info.relativeName}';
    export type __ThisModuleType__ = typeof __ThisModule__;`;
    // console.log(typings);
    await fse.outputFile(outFileName, typings);
    await processHelper.formatFile({ fileName: outFileName });
  }
  // ------ typings/core/index.d.ts
  // const outFileName = `${module.root}/typings/core/index.d.ts`;
  // if (!fse.existsSync(outFileName)) {
  //   const typings = '';
  //   await fse.outputFile(outFileName, typings);
  //   await processHelper.formatFile({ fileName: outFileName });
  // }
  // ------ package.json
  // delete require.cache[require.resolve(module.pkg)];
  // const pkgOld =  require(module.pkg);
  // let pkgOld = fse.readFileSync(module.pkg);
  // pkgOld = JSON.parse(pkgOld);
  // const pkgNew = {};
  // pkgNew.name = pkgOld.name;
  // pkgNew.version = pkgOld.version;
  // if (pkgOld.title) pkgNew.title = pkgOld.title;
  // pkgNew.eggBornModule = pkgOld.eggBornModule;
  // pkgNew.type = 'module';
  // pkgNew.exports = {
  //   '.': {
  //     types: ['./src/index.ts', './dist/index.d.ts'],
  //     import: './dist/index.js',
  //     default: './src/index.ts',
  //   },
  //   './package.json': './package.json',
  // };
  // pkgNew.description = pkgOld.description || '';
  // pkgNew.files = ['dist', 'static', 'typings']; // no need 'utils' 'test', 'cms', 'docs'
  // if (pkgOld.eggBornModule.cms) {
  //   pkgNew.files.push('cms');
  // }
  // pkgNew.scripts = pkgOld.scripts;
  // if (pkgOld.keywords) pkgNew.keywords = pkgOld.keywords;
  // if (pkgOld.author) pkgNew.author = pkgOld.author;
  // if (pkgOld.license) pkgNew.license = pkgOld.license;
  // if (pkgOld.dependencies) pkgNew.dependencies = pkgOld.dependencies;
  // const pkgNewStr = JSON.stringify(pkgNew, null, 2);
  // // if (!['a-base', 'test-party'].includes(module.info.relativeName)) {
  // //   return;
  // // }
  // // console.log(pkgNewStr);
  // const outFileName = `${module.root}/package.json`;
  // await fse.outputFile(outFileName, pkgNewStr);
  // await processHelper.formatFile({ fileName: outFileName });
  // if (!module.suite) {
  //   console.log(`{
  //   "path": "src/module/${module.package.name.substring('cabloy-module-api-'.length)}"
  // },`);
  // }
  // // tsconfig
  // const tsconfig = `{
  //   "extends": "../../tsconfig.json",
  //   "compilerOptions": {
  //     "rootDir": "src",
  //     "outDir": "dist"
  //   },
  //   "include": ["src/**/*", "typings/**/*"]
  // }`;
  // const outFileName = `${module.root}/tsconfig.json`;
  // await fse.outputFile(outFileName, tsconfig);
  // await processHelper.formatFile({ fileName: outFileName });
  // console.log(module);
  // await _jstots({ module, processHelper });
  // await fse.move(`${module.root}/src/main.js`, `${module.root}/src/index.js`);
  // await fse.remove(`${module.root}/dist`);
  // await _modulePublish({ module, processHelper });
  // await _moduleRemoveFront({ module });
}

async function _jstots({ module, processHelper }) {
  const pattern = `${module.root}/test/**/*.js`;
  // files
  const files = await eggBornUtils.tools.globbyAsync(pattern);
  // convert
  const filesTo = [];
  for (const file of files) {
    const pos = String(file).lastIndexOf('.js');
    const fileTo = String(file).substring(0, pos) + '.ts';
    await fs.rename(file, fileTo);
    filesTo.push(fileTo);
  }
  console.log(filesTo);
}

async function _modulePublish({ module, processHelper }) {
  console.log(module.info.fullName);
  const cabloyConfig = require('../cabloy.json');
  const entities = cabloyConfig.store.commands.publish.entities;
  const entity = entities[module.info.relativeName];
  if (entity && entity.scripts.includes('npmPublish')) {
    console.log(cabloyConfig);
    await processHelper.npmPublish({ cwd: module.root });
  }
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
