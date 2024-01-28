const fse = require('fs-extra');
const fs = require('node:fs/promises');
const { ProcessHelper } = require('@cabloy/process-helper');
const { glob } = require('@cabloy/module-glob');
const eggBornUtils = require('egg-born-utils');
const argv = require('./lib/parse_argv')('sync');
const path = require('node:path');
const gogocode = require('gogocode');

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

async function _moduleHandle_useScope({ file, module, processHelper }) {
  console.log(file);
  const contentOld = (await fse.readFile(file)).toString();
  const scopeModuleName = getScopeModuleName(module.info.relativeName);
  console.log(scopeModuleName);
  //
  const fileThis = `${module.root}/src/resource/this.js`;
  let fileRelative = path.relative(path.dirname(file), fileThis);
  if (fileRelative[0] !== '.') {
    fileRelative = './' + fileRelative;
  }
  console.log(fileRelative);
  // replace
  // const contentNew = contentOld
  //   .replace(/import \{ ScopeModule.*? \} from '.*?\/index\.js';/, `import { ScopeModule } from '${fileRelative}';`)
  //   .replace(`extends BeanBase {`, `extends BeanBase<ScopeModule> {`)
  //   .replace(/@Use[\s\S\n]*?scope: ScopeModule.*?;/, '');
  const contentNew = contentOld.replace(`import { BeanBase, Controller, Use }`, `import { BeanBase, Controller }`);
  // console.log(contentNew);
  await fse.outputFile(file, contentNew);
  await processHelper.formatFile({ fileName: file });
}

async function _moduleHandle({ module, processHelper }) {
  const pattern = `${module.root}/src/controller/**/*.ts`;
  const files = await eggBornUtils.tools.globbyAsync(pattern);
  for (const file of files) {
    // const contentOld = (await fse.readFile(file)).toString();
    // console.log(contentOld);
    // const matchExport = contentOld.match(/export class /);
    // if (matchExport) {
    //   // console.log('---- not changed: ', module.info.relativeName);
    //   return;
    // }
    // if (contentOld.indexOf('.util.mixinClasses') === -1) {
    //  continue;
    // }
    // console.log(file);
    // if (file.indexOf('cli/templates') > -1) {
    //   process.exit(0);
    // }
    await _moduleHandle_useScope({ file, module, processHelper });
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

function getScopeModuleName(moduleName) {
  const parts2 = moduleName.split('-').map(name => {
    return name.charAt(0).toUpperCase() + name.substring(1);
  });
  return `ScopeModule${parts2.join('')}`;
}

function classPathToClassNameMixin(classPath) {
  const pos = classPath.lastIndexOf('/');
  classPath = classPath.substring(pos + 1);
  const parts = classPath
    .replaceAll('.', '_')
    .split('_')
    .map(name => {
      return name.charAt(0).toUpperCase() + name.substring(1);
    });
  return parts.join('');
}

function parseSceneName(classPath) {
  const pos = classPath.lastIndexOf('.');
  return classPath.substring(0, pos);
}

function parseShortName(classPath) {
  const pos = classPath.lastIndexOf('.');
  return classPath.substring(pos + 1);
}

function classPathToClassName(prefix, classPath) {
  prefix = prefix.charAt(0).toUpperCase() + prefix.substring(1);
  const parts = classPath.split('/').map(part => {
    const parts2 = part
      .replaceAll('.', '-')
      .split('-')
      .map(name => {
        return name.charAt(0).toUpperCase() + name.substring(1);
      });
    return parts2.join('');
  });
  return `${prefix}${parts.join('')}`;
}

function parseBeanName(beanClassName, scene) {
  // scene
  if (!scene) scene = 'bean';
  scene = scene.toLowerCase().replace(/\./gi, '');
  // bean class name
  let name;
  if (beanClassName.toLowerCase().startsWith(scene)) {
    name = beanClassName.substring(scene.length);
  } else {
    name = beanClassName;
  }
  // lowerCase
  name = name.charAt(0).toLowerCase() + name.substring(1);
  return name;
}
