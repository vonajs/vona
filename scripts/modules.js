const fse = require('fs-extra');
const fs = require('node:fs/promises');
const { ProcessHelper } = require('@cabloy/process-helper');
const { glob } = require('@cabloy/module-glob');
const eggBornUtils = require('egg-born-utils');
const argv = require('./lib/parse_argv')('sync');
const path = require('node:path');

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

async function _moduleHandle_atom({ file, module, processHelper }) {
  if (!fse.existsSync(file)) {
    console.log('---- not changed: ', module.info.relativeName);
    return;
  }
  const contentOld = (await fse.readFile(file)).toString();
  //
  const classPath = path.basename(file).replace('.ts', '');
  const classNameNew = classPathToClassName('Atom', classPath);
  // console.log(classNameNew);
  // 1. 查看是否需要转换export class
  let needLog = false;
  const matchExport = contentOld.match(/export class /);
  if (!matchExport) {
    needLog = true;
    // 解析内容
    const contentMatches = contentOld.match(/([\s\S\n]*)module\.exports = class ([\S]*?) [\s\S\n]*?\{([\s\S\n]*)/);
    if (!contentMatches) {
      console.log('---- not matched: ', file);
      process.exit(0);
    }
    // console.log(contentMatches);
    let importBase;
    if (module.info.relativeName === 'a-base') {
      importBase = `import { BeanAtomBase } from '../bean/virtual.atomBase.js';`;
    } else {
      importBase = `import { BeanAtomBase } from 'cabloy-module-api-a-base';`;
    }
    const contentNew = `
import { Atom } from '@cabloy/core';
${importBase}

${contentMatches[1]}

@Atom()
export class ${classNameNew} extends AtomBase {
${contentMatches[3]}
  `;
    console.log(contentNew);
    // await fse.outputFile(file, contentNew);
    // await processHelper.formatFile({ fileName: file });
  }
  return;
  // 2. 查看是否需要在resource/locals中添加记录
  const fileLocals = `${module.root}/src/resource/locals.ts`;
  let contentLocals = (await fse.readFile(fileLocals)).toString();
  if (contentLocals.indexOf(`{ ${classNameNew} }`) === -1) {
    needLog = true;
    if (contentLocals.indexOf('import') === -1) {
      // the first
      contentLocals = `
export * from '../local/${classPath}.js';

import { ${classNameNew} } from '../local/${classPath}.js';

export interface IModuleLocal {
  '${classPath}': ${classNameNew};
}
      `;
    } else {
      contentLocals = contentLocals
        .replace('export * from', `export * from '../local/${classPath}.js';\nexport * from`)
        .replace('import {', `import { ${classNameNew} } from '../local/${classPath}.js';\nimport {`)
        .replace(
          'export interface IModuleLocal {',
          `export interface IModuleLocal {\n  '${classPath}': ${classNameNew};`,
        );
    }
    // console.log(contentLocals);
    // await fse.outputFile(fileLocals, contentLocals);
    // await processHelper.formatFile({ fileName: fileLocals });
  }
  // 3. log
  if (needLog) {
    console.log('--------: ', file);
  }
}

async function _moduleHandle({ module, processHelper }) {
  const pattern = `${module.root}/src/atom/*.ts`;
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
    // if (file.indexOf('_.ts') > -1) continue;
    console.log(file);
    await _moduleHandle_atom({ file, module, processHelper });
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

function classPathToClassName(prefix, classPath) {
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
