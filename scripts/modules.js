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

//

async function _moduleHandle_mixin({ file, module, processHelper }) {
  // const file = `${module.root}/src/resource/models.ts`;
  if (!fse.existsSync(file)) {
    console.log('---- not changed: ', module.info.relativeName);
    return;
  }
  const contentOld = (await fse.readFile(file)).toString();
  const matchExport = contentOld.match(/export class /);
  if (matchExport) {
    // console.log('---- not changed: ', module.info.relativeName);
    return;
  }
  console.log(file);
  const regexp = /const (.*?) =.*\.\/(.*?)\.js/g;
  const matches = contentOld.matchAll(regexp);
  const outputNew1 = [];
  const outputNew2 = [];
  const outputNew3 = [];
  let matchCount = 0;
  const names = [];
  for (const match of matches) {
    matchCount++;
    const classNameOld = match[1];
    const classPath = match[2];
    if (classNameOld.indexOf('.') > -1) {
      console.log('has . :', module.info.relativeName);
      return;
    }
    const classNameNew = classPathToClassNameMixin(classPath);
    console.log(classNameOld, classPath, classNameNew);
    names.push({
      classNameOld,
      classPath,
      classNameNew,
    });
  }
  // name base
  const matchesBase = contentOld.match(/mixinClasses\((.*?),/);
  if (!matchesBase) {
    console.log('not match base', file);
    return;
  }
  const classNameBase = matchesBase[1];
  // force base to the first
  const nameBaseIndex = names.findIndex(item => item.classNameOld === classNameBase);
  if (nameBaseIndex > 0) {
    const _nameBase = names.splice(nameBaseIndex, 1);
    names.unshift(_nameBase[0]);
  }
  // loop
  for (let index = 0; index < names.length; index++) {
    const { classNameOld, classPath, classNameNew } = names[index];
    // models.ts
    // outputNew1.push(`export * from '../model/${classPath}.js';`);
    // outputNew2.push(`import { ${classNameNew} } from '../model/${classPath}.js';`);
    // outputNew3.push(`${classNameOld}: ${classNameNew};`);
    // class
    const classFile = path.resolve(path.dirname(file), classPath + '.ts');
    // console.log(classFile);
    const classContent = (await fse.readFile(classFile)).toString();
    const matchExport = classContent.match(/export class /);
    if (matchExport) {
      console.log('---- not changed: ', classFile);
      process.exit(0);
      return;
    }
    // const classNameNew = classPathToClassName('Controller', classPath);
    // const beanName = parseBeanName(classNameNew, 'Controller');
    // console.log(classNameNew, classNameOld);
    // 获取基类
    let extendName = '';
    if (index === 0) {
      if (classContent.indexOf('BeanModuleScopeBase') > -1) {
        extendName = 'BeanModuleScopeBase';
      } else {
        extendName = 'BeanBase';
      }
    } else {
      extendName = names[index - 1].classNameNew;
    }
    // 解析内容
    const contentMatches = classContent.match(/([\s\S\n]*)module\.exports = class ([\S]*?) [\s\S\n]*?\{([\s\S\n]*)/);
    if (!contentMatches) {
      console.log('---- not matched: ', classFile);
      return;
    }
    // console.log(contentMatches);
    // 计算importName
    let importName = '';
    if (extendName === 'BeanModuleScopeBase') {
      importName = ` import { BeanModuleScopeBase } from '@cabloy/core';`;
    } else if (extendName === 'BeanBase') {
      importName = `import { BeanBase } from '@cabloy/core';`;
    } else {
      let __classPath = names[index - 1].classPath;
      const pos = __classPath.lastIndexOf('/');
      __classPath = __classPath.substring(pos + 1);
      importName = `import {${extendName}} from './${__classPath}.js';`;
    }
    const contentNew = `
${importName}

${contentMatches[1]}

export class ${classNameNew} extends ${extendName} {
${contentMatches[3]}
    `;
    console.log(contentNew);
    await fse.outputFile(classFile, contentNew);
    await processHelper.formatFile({ fileName: classFile });
  }
  if (matchCount !== names.length) {
    console.log('---- match length not equal: ', module.info.relativeName);
    process.exit(0);
    return;
  }

  const currentClassName = classPathToClassNameMixin(path.basename(file).replace('.ts', ''));

  const outputNew = `
import { Bean } from '@cabloy/core';

@Bean()
export class ${currentClassName} extends ${names[names.length - 1].classNameNew} {

}
  `;
  console.log(outputNew);
  // process.exit(0);
  await fse.outputFile(file, outputNew);
  await processHelper.formatFile({ fileName: file });
}

async function _moduleHandle({ module, processHelper }) {
  const pattern = `${module.root}/src/**/*.ts`;
  const files = await eggBornUtils.tools.globbyAsync(pattern);
  for (const file of files) {
    const contentOld = (await fse.readFile(file)).toString();
    // console.log(contentOld);
    // const matchExport = contentOld.match(/export class /);
    // if (matchExport) {
    //   // console.log('---- not changed: ', module.info.relativeName);
    //   return;
    // }
    if (contentOld.indexOf('.util.mixinClasses') === -1) {
      continue;
    }
    // if (file.indexOf('/bean.atom.ts') === -1) return;
    // console.log(file);
    await _moduleHandle_mixin({ file, module, processHelper });
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
