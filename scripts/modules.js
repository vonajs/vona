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

//

async function _moduleHandle({ module, processHelper }) {
  const file = `${module.root}/src/resource/models.ts`;
  if (!fse.existsSync(file)) {
    console.log('---- not changed: ', module.info.relativeName);
    return;
  }
  const contentOld = (await fse.readFile(file)).toString();
  const matchExport = contentOld.match(/export /);
  if (matchExport) {
    // console.log('---- not changed: ', module.info.relativeName);
    return;
  }
  console.log(file);
  const regexp = /const (.*?) =.*model\/(.*?)\.js/g;
  const matches = contentOld.matchAll(regexp);
  const outputNew1 = [];
  const outputNew2 = [];
  const outputNew3 = [];
  let matchCount = 0;
  for (const match of matches) {
    matchCount++;
    const classNameOld = match[1];
    const classPath = match[2];
    if (classNameOld.indexOf('.') > -1) {
      console.log('has . :', module.info.relativeName);
      return;
    }
    const classNameNew = classPathToClassName('Model', classPath);
    // console.log(classNameOld, classPath, classNameNew);
    // models.ts
    outputNew1.push(`export * from '../model/${classPath}.js';`);
    outputNew2.push(`import { ${classNameNew} } from '../model/${classPath}.js';`);
    outputNew3.push(`${classNameOld}: ${classNameNew};`);
    // model
    const classFile = `${module.root}/src/model/${classPath}.ts`;
    // console.log(classFile);
    const classContent = (await fse.readFile(classFile)).toString();
    const matchExport = classContent.match(/export /);
    if (matchExport) {
      console.log('---- not changed: ', classFile);
      continue;
    }
    // const classNameNew = classPathToClassName('Controller', classPath);
    // const beanName = parseBeanName(classNameNew, 'Controller');
    // console.log(classNameNew, classNameOld);
    // 替换内容
    const contentMatches = classContent.match(
      /([\s\S\n]*)module\.exports = class ([\S]*) extends [\s\S\n]* super\(([\s\S\n]*?)\);[\s\n]*?\}([\s\S\n]*)/,
    );
    if (!contentMatches) {
      console.log('---- not matched: ', classFile);
      return;
    }
    // console.log(contentMatches);
    const contentNew = `
import { BeanModelBase, Model } from '@cabloy/core';

${contentMatches[1]}

@Model(${contentMatches[3]})
export class ${classNameNew} extends BeanModelBase {
${contentMatches[4]}
    `;
    // console.log(contentNew);
    await fse.outputFile(classFile, contentNew);
    await processHelper.formatFile({ fileName: classFile });
  }
  if (matchCount.length !== outputNew1.length) {
    console.log('---- match length not equal: ', module.info.relativeName);
    process.exit(0);
    return;
  }
  const outputNew = `
${outputNew1.join('\n')}

${outputNew2.join('\n')}

export interface IModuleModel {
  ${outputNew3.join('\n')}
}
  `;
  // console.log(outputNew);
  await fse.outputFile(file, outputNew);
  await processHelper.formatFile({ fileName: file });
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

function classPathToClassName(prefix, classPath) {
  const parts = classPath.split('/').map(part => {
    const parts2 = part.split('-').map(name => {
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
