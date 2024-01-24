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
  const file = `${module.root}/src/config/locale/en-us.ts`;
  if (fse.existsSync(file)) {
    console.log('---- not changed: ', module.info.relativeName);
    return;
  }
  const contentNew = `
  export default {
  };  
    `;
  console.log(contentNew);
  // await fse.outputFile(classFile, contentNew);
  // await processHelper.formatFile({ fileName: classFile });
  //
  const outputNew = `
  
  `;
  // console.log(outputNew);
  // await fse.outputFile(file, outputNew);
  // await processHelper.formatFile({ fileName: file });
}

async function _moduleHandle_errors({ module, processHelper }) {
  const file = `${module.root}/src/config/errors.ts`;
  if (!fse.existsSync(file)) {
    console.log('---- not changed: ', module.info.relativeName);
    return;
  }
  const contentOld = (await fse.readFile(file)).toString();
  const matchExport = contentOld.match(/export /);
  if (matchExport) {
    console.log('---- not changed: ', module.info.relativeName);
    return;
  }
  const regexp = /(\d*): ('.*')/g;
  const matches = contentOld.matchAll(regexp);
  const outputNew1 = [];
  const outputNew2 = [];
  for (const match of matches) {
    const classNameOld = match[1];
    const classPath = match[2];
    // console.log(classNameOld, classPath);
    outputNew1.push(`${classPath} = ${classNameOld},`);
  }
  const outputNew = `
  export enum Errors {
    ${outputNew1.join('\n')}
  }
  `;
  // console.log(outputNew);
  await fse.outputFile(file, outputNew);
  await processHelper.formatFile({ fileName: file });
}

async function _moduleHandle_locales({ module, processHelper }) {
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

async function _moduleHandle_constants({ module, processHelper }) {
  const file = `${module.root}/src/config/constants.ts`;
  if (fse.existsSync(file)) {
    console.log('---- not changed: ', module.info.relativeName);
    return;
  }
  const scopeModuleName = getScopeModuleName(module.info.relativeName);
  const contentNew = `
  export const constants = null;
    `;
  // console.log(contentNew);
  await fse.outputFile(file, contentNew);
  await processHelper.formatFile({ fileName: file });
  // // ------ controller
  // const fileControllers = `${module.root}/src/controllers.ts`;
  // if (!fse.existsSync(fileControllers)) {
  //   console.log('---- not changed: ', module.info.relativeName);
  //   return;
  // }
  // // move
  // const pathTo = `${module.root}/src/resource/controllers.ts`;
  // await fse.move(fileControllers, pathTo);
}

async function _moduleHandle_controller2({ module, processHelper }) {
  // ------ controller
  // if (!['test-party'].includes(module.info.relativeName)) return;
  // console.log(module.info.relativeName);
  const fileControllers = `${module.root}/src/controllers.ts`;
  if (!fse.existsSync(fileControllers)) {
    console.log('---- not changed: ', module.info.relativeName);
    return;
  }
  const controllers = (await fse.readFile(fileControllers)).toString();
  const regexp = /const (.*) = .*\/controller\/(.*)\.js/g;
  const matches = controllers.matchAll(regexp);
  for (const match of matches) {
    const classNameOld = match[1];
    const classPath = match[2];
    const classFile = `${module.root}/src/controller/${classPath}.ts`;
    // console.log(classFile);
    const classContent = (await fse.readFile(classFile)).toString();
    const classNameNew = classPathToClassName('Controller', classPath);
    const beanName = parseBeanName(classNameNew, 'Controller');
    // console.log(classNameNew, classNameOld);
    // 替换内容
    const contentMatches = classContent.match(/([\s\S\n]*export class [\S]* extends BeanBase \{)([\s\S\n]*)/);
    if (!contentMatches) {
      console.log('---- not matched: ', module.info.relativeName, classNameNew);
      return;
    }
    // console.log(contentMatches[2]);
    // console.log(contentMatches);
    let contentNew = `
${contentMatches[1]}
@Use()
scope: ${getScopeModuleName(module.info.relativeName)};

${contentMatches[2]}
    `;
    // local
    contentNew = contentNew.replaceAll('this.ctx.service', 'this.scope.local');
    contentNew = contentNew.replaceAll('this.service', 'this.scope.local');
    // console.log(contentNew);
    await fse.outputFile(classFile, contentNew);
    await processHelper.formatFile({ fileName: classFile });
  }
}

async function _moduleHandle_controller({ module, processHelper }) {
  // ------ controller
  // if (!['test-party'].includes(module.info.relativeName)) return;
  // console.log(module.info.relativeName);
  const fileControllers = `${module.root}/src/controllers.ts`;
  if (!fse.existsSync(fileControllers)) {
    console.log('---- not changed: ', module.info.relativeName);
    return;
  }
  const controllers = (await fse.readFile(fileControllers)).toString();
  const regexp = /const (.*) = .*\/controller\/(.*)\.js/g;
  const matches = controllers.matchAll(regexp);
  for (const match of matches) {
    const classNameOld = match[1];
    const classPath = match[2];
    const classFile = `${module.root}/src/controller/${classPath}.ts`;
    // console.log(classFile);
    const classContent = (await fse.readFile(classFile)).toString();
    const classNameNew = classPathToClassName('Controller', classPath);
    const beanName = parseBeanName(classNameNew, 'Controller');
    // console.log(classNameNew, classNameOld);
    // 替换内容
    const contentMatches = classContent.match(/([\s\S\n]*)module\.exports = class ([\S]*) (\{[\s\S\n]*)/);
    if (!contentMatches) {
      console.log('---- not matched: ', module.info.relativeName);
      return;
    }
    // console.log(contentMatches);
    const contentNew = `
import { BeanBase, Controller, Use } from '@cabloy/core';
import { ${getScopeModuleName(module.info.relativeName)} } from '../index.js';    
${contentMatches[1]}
@Controller()
export class ${classNameNew} extends BeanBase ${contentMatches[3]}
    `;
    // console.log(contentNew);
    await fse.outputFile(classFile, contentNew);
    await processHelper.formatFile({ fileName: classFile });

    // 别忘了替换routes中的controller name
    const routesFile = `${module.root}/src/routes.ts`;
    let routesContent = (await fse.readFile(routesFile)).toString();
    routesContent = routesContent.replaceAll(`controller: '${classNameOld}'`, `controller: '${beanName}'`);
    // console.log(routesContent, beanName);
    await fse.outputFile(routesFile, routesContent);
    await processHelper.formatFile({ fileName: routesFile });
  }

  // ------ src/resource/aops.ts
  // const outFileName = `${module.root}/src/resource/aops.ts`;
  // if (!fse.existsSync(outFileName)) {
  //   const typings = ``;
  //   // console.log(typings);
  //   await fse.outputFile(outFileName, typings);
  //   await processHelper.formatFile({ fileName: outFileName });
  // }
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
