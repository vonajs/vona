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

async function _moduleHandle_({ module, processHelper }) {
  const file = `${module.root}/src/config/locales.ts`;
  if (!fse.existsSync(file)) {
    console.log('---- not changed: ', module.info.relativeName);
    return;
  }
  const contentOld = (await fse.readFile(file)).toString();
  const regexp = /'(.*)': require\('\.\/(.*)\.js'\)/g;
  const matches = contentOld.matchAll(regexp);
  const routesNew1 = [];
  const routesNew2 = [];
  for (const match of matches) {
    const classNameOld = match[1];
    const classPath = match[2];
    console.log(classNameOld, classPath);
    routesNew1.push(`import ${classNameOld.replace('-', '_')} from './${classPath}.js';`);
    routesNew2.push(`'${classNameOld}': ${classNameOld.replace('-', '_')},`);
    //
    const classFile = `${module.root}/src/config/${classPath}.ts`;
    // console.log(classFile);
    const classContent = (await fse.readFile(classFile)).toString();
    // const classNameNew = classPathToClassName('Controller', classPath);
    // const beanName = parseBeanName(classNameNew, 'Controller');
    // console.log(classNameNew, classNameOld);
    // 替换内容
    const contentMatches = classContent.match(/([\s\S\n]*)module\.exports = (\{[\s\S\n]*)/);
    if (!contentMatches) {
      console.log('---- not matched: ', module.info.relativeName);
      return;
    }
    // console.log(contentMatches);
    const contentNew = `
${contentMatches[1]}
export default ${contentMatches[2]}
    `;
    // console.log(contentNew);
    await fse.outputFile(classFile, contentNew);
    await processHelper.formatFile({ fileName: classFile });

    // 别忘了替换routes中的controller name
    // const routesFile = `${module.root}/src/routes.ts`;
    // let routesContent = (await fse.readFile(routesFile)).toString();
    // routesContent = routesContent.replaceAll(`controller: '${classNameOld}'`, `controller: '${beanName}'`);
    // console.log(routesContent, beanName);
    // await fse.outputFile(routesFile, routesContent);
    // await processHelper.formatFile({ fileName: routesFile });
  }
  // routes
  const routesContentNew = `
${routesNew1.join('\n')}

export const locales = {
  ${routesNew2.join('\n')}
};
  `;
  console.log(routesContentNew);
  await fse.outputFile(file, routesContentNew);
  await processHelper.formatFile({ fileName: file });
}

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
