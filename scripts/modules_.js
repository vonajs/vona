const fse = require('fs-extra');
const fs = require('node:fs/promises');
const { ProcessHelper } = require('@cabloy/process-helper');
const { glob } = require('@cabloy/module-glob');
const eggBornUtils = require('egg-born-utils');
const argv = require('./lib/parse_argv')('sync');
const knex = require('knex');
const pg = knex({
  client: 'pg',
  connection: {
    // connectionString: config.DATABASE_URL,
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    database: 'cabloy-test-cabloy-source-20240310-135400',
    password: 'yj123456',
  },
});

pg.destroy();

(async function () {
  await main();
})();

async function main() {
  // message
  const message = argv.args[0];
  const processHelper = new ProcessHelper(process.cwd());

  // modules
  const { modules, modulesArray, suites } = await glob({
    projectMode: 'vona',
    projectPath: process.cwd(),
    disabledModules: undefined,
    disabledSuites: null,
    log: true,
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

async function main2() {
  const pattern = 'src/**/package.json';
  const files = await eggBornUtils.tools.globbyAsync(pattern, {
    ignore: [
      '**/node_modules/**',
      'dist/**',
      'cabloy-template-api/**',
      'docker-compose/**',
      '**/assets/js/**',
      '**/static/**',
    ],
  });
  for (const file of files) {
    const fileSrc = path.join(process.cwd(), file);
    const pkg = require(fileSrc);
    if (!pkg.version) continue;
    let name = pkg.name;
    if (name.indexOf('cabloy-module') === -1 && name.indexOf('cabloy-suite') === -1) {
      continue;
    }
    name = name.replace('-api-', '-front-');
    const url = `https://registry.npmjs.com/${name}`;
    const res = await fetch(url);
    const body = await res.json();
    if (body.error !== 'Not found') continue;
    console.log(name);
    // console.log(file);
    // console.log(body);
    const fileDest = path.join(process.cwd(), '.assets/none/package.json');
    const dirDest = path.join(process.cwd(), '.assets/none');
    pkg.name = name;
    await fse.outputFile(fileDest, JSON.stringify(pkg, null, 2));
    // await fse.copyFile(fileSrc, fileDest);
    const processHelper = new ProcessHelper(process.cwd());
    await processHelper.npmPublish({ cwd: dirDest });
    console.log('---- done');
  }
}

async function main2() {
  const pattern = '**/package.json';
  const files = await eggBornUtils.tools.globbyAsync(pattern, {
    ignore: [
      '**/node_modules/**',
      'dist/**',
      'cabloy-template-api/**',
      'docker-compose/**',
      '**/assets/js/**',
      '**/static/**',
    ],
  });
  for (const file of files) {
    const fileSrc = path.join(process.cwd(), file);
    const package = require(fileSrc);
    if (!package.version) continue;
    const url = `https://registry.npmjs.com/${package.name}`;
    const res = await fetch(url);
    const body = await res.json();
    if (body.error !== 'Not found') continue;
    console.log(package.name);
    // console.log(file);
    // console.log(body);
    const fileDest = path.join(process.cwd(), '.assets/none/package.json');
    const dirDest = path.join(process.cwd(), '.assets/none');
    await fse.copyFile(fileSrc, fileDest);
    const processHelper = new ProcessHelper(process.cwd());
    await processHelper.npmPublish({ cwd: dirDest });
    console.log('---- done');
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
// import { IModuleRoute } from 'vona';
// export const routes: IModuleRoute[] = [];

//

function _coerceColumnValue(type) {
  if (['bit', 'bool', 'boolean'].includes(type)) return 'boolean';
  if (['int'].includes(type)) return 'number';
  if (_columnTypePrefixes(type, ['timestamp'])) return 'Date';
  if (_columnTypePrefixes(type, ['float', 'double'])) return 'number';
  if (_columnTypePrefixes(type, ['tinyint', 'smallint', 'mediumint', 'bigint', 'numeric', 'integer'])) {
    return 'number';
  }
  if (type === 'json') return 'string';
  return 'string';
}

function _columnTypePrefixes(type, prefixes) {
  return prefixes.some(prefix => type.indexOf(prefix) > -1);
}

async function _moduleHandle_model({ file: fileModel, module, processHelper }) {
  const modelName = path.basename(fileModel).replace('.ts', '');
  const entityNameInterface = 'Entity' + modelName.charAt(0).toUpperCase() + modelName.substring(1);
  const contentModel = (await fse.readFile(fileModel)).toString();
  // const contentMatches = contentModel.match(/table:[\s]*'(.*?)'/);
  // if (!contentMatches) {
  //   console.log('---- not matched: ', module.info.relativeName, modelName);
  //   return;
  // }
  // const tableName = contentMatches[1];
  // if (modelName !== 'instance') return;
  if (contentModel.indexOf('BeanModelBase, ') === -1) {
    console.log(fileModel);
    return;
  }
  // BeanModelBase
  let contentNew = contentModel.replace('BeanModelBase, ', '');
  contentNew = contentNew.replace(
    "'vona';",
    `'vona';\nimport { BeanModelBase } from 'vona-module-a-database';\nimport { ${entityNameInterface} } from '../entity/${modelName}.js';\n`,
  );
  contentNew = contentNew.replace('BeanModelBase {', `BeanModelBase<${entityNameInterface}> {`);
  console.log(contentNew);
  await fse.outputFile(fileModel, contentNew);
  await processHelper.formatFile({ fileName: fileModel });
}

async function _moduleHandle_model({ file, module, processHelper }) {
  console.log(file);
  let contentOld = (await fse.readFile(file)).toString();
  if (contentOld.indexOf('EntityItemBase {') > -1) {
    contentOld = contentOld.replace("import {} from 'vona';", "import { EntityItemBase } from 'vona-module-a-base';");
  } else {
    contentOld = contentOld.replace("import {} from 'vona';", "import { EntityBaseTemp } from 'vona-module-a-base';");
  }
  console.log(contentOld);
  await fse.outputFile(file, contentOld);
  await processHelper.formatFile({ fileName: file });
}

async function _moduleHandle_model({ file: fileModel, module, processHelper }) {
  // console.log(file);
  const modelName = path.basename(fileModel).replace('.ts', '');
  const entityNameInterface = 'Entity' + modelName.charAt(0).toUpperCase() + modelName.substring(1);
  const contentModel = (await fse.readFile(fileModel)).toString();
  const contentMatches = contentModel.match(/table:[\s]*'(.*?)'/);
  if (!contentMatches) {
    console.log('---- not matched: ', module.info.relativeName, modelName);
    return;
  }
  const tableName = contentMatches[1];
  // console.log(tableName);
  // columns
  const map = await pg(tableName).columnInfo();
  // console.log(map);
  let entities = '';
  for (const columnName in map) {
    if (['id', 'createdAt', 'updatedAt', 'deleted', 'iid', 'atomId'].includes(columnName)) continue;
    const columnType = _coerceColumnValue(map[columnName].type);
    entities = `${entities}\n  ${columnName}: ${columnType};`;
  }
  const classBase = map.atomId ? 'EntityItemBase' : 'EntityBase';
  const contentNew = `import { ${classBase} } from 'vona';

export interface ${entityNameInterface} extends ${classBase} {${entities}
}
`;
  // console.log(contentNew);
  const classFile = `${module.root}/src/entity/${modelName}.ts`;
  console.log(classFile);
  await fse.outputFile(classFile, contentNew);
  await processHelper.formatFile({ fileName: classFile });
  // const file = path.join(module.root, `src/entity/${modelName}.ts`);
}

async function _moduleHandle_modelIndex({ module, processHelper }) {
  // index.ts
  const file = path.join(module.root, 'src/resource/index.ts');
  const contentOld = (await fse.readFile(file)).toString();
  if (contentOld.indexOf('./entities.js') === -1) {
    const contentNew = `${contentOld}export * from './entities.js';\n`;
    console.log(contentNew);
    await fse.outputFile(file, contentNew);
    await processHelper.formatFile({ fileName: file });
  }
}

async function _moduleHandle_ts({ file, module, processHelper }) {
  if (module.info.relativeName === 'a-base') return;
  // console.log(file);
  const contentOld = (await fse.readFile(file)).toString();
  const regexp = /export .*? '([^']*?)';/g;
  const matches = contentOld.matchAll(regexp);
  const outputNew1 = [];
  const outputNew2 = [];
  const outputNew3 = [];
  let matchCount = 0;
  for (const match of matches) {
    matchCount++;
    const classNameOld = match[1];
    // console.log(classNameOld);
    outputNew1.push(`import '${classNameOld}';`);
  }
  const contentNew = `
${outputNew1.join('\n')}
  `;
  console.log(contentNew);
  const fileNew = `${module.root}/src/types.d.ts`;
  await fse.outputFile(fileNew, contentNew);
  await processHelper.formatFile({ fileName: fileNew });

  await fse.remove(`${module.root}/src/typings`);
}

async function _moduleHandle_backend({ file, module, processHelper }) {
  // console.log(file);
  // await fse.move(file, `${module.root}/src/typings/core/index.ts`);
  let contentOld = (await fse.readFile(file)).toString();
  const regexp = /import 'vona-module-(.*?)';/g;
  const matches = contentOld.matchAll(regexp);
  const outputNew1 = [];
  const outputNew2 = [];
  const outputNew3 = [];
  let matchCount = 0;
  for (const match of matches) {
    matchCount++;
    const classNameOld = match[1];
    const classPath = match[1];
    const classNameNew = classPathToClassName('', classPath);
    console.log(classNameOld, classPath, classNameNew);
    // models.ts
    contentOld = contentOld.replace(
      `import 'vona-module-${classPath}';`,
      `export type * as ${classNameNew} from 'vona-module-${classPath}';`,
    );
  }
  // console.log(contentOld);
  await fse.outputFile(file, contentOld);
  await processHelper.formatFile({ fileName: file });
}

async function _moduleHandle_bean({ file, module, processHelper }) {
  // if (module.info.relativeName === 'a-base') return;
  // console.log(file);
  const contentOld = (await fse.readFile(file)).toString();
  // console.log(contentOld);
  const regexp = /export \* from '\.\.\/bean\/bean\.(.*?)\.js';/g;
  const matches = contentOld.matchAll(regexp);
  const outputNew1 = [];
  const outputNew2 = [];
  const outputNew3 = [];
  let matchCount = 0;
  for (const match of matches) {
    matchCount++;
    const classNameOld = match[1];
    const classNameNew = classPathToClassName('Bean', classNameOld);
    // console.log(classNameOld, classNameNew);
    const _declare = `${classNameOld}: ${classNameNew}`;
    if (contentOld.indexOf(_declare) === -1) {
      // console.log(file);
      // console.log(classNameNew);
      outputNew1.push(`import { ${classNameNew} } from '../bean/bean.${classNameOld}.js';`);
      outputNew2.push(`${classNameOld}: ${classNameNew};`);
    }
  }
  if (outputNew1.length === 0) {
    return;
  }
  //
  let contentNew;
  if (contentOld.indexOf('export interface IBeanRecord') === -1) {
    contentNew = `
${contentOld}

declare module 'vona' {
  export interface IBeanRecord {
  }
}
`;
  } else {
    contentNew = contentOld;
  }
  //
  if (contentNew.indexOf('import {') > -1) {
    contentNew = contentNew.replace('import {', `${outputNew1.join('\n')}import {`);
  } else {
    contentNew = contentNew.replace('declare module', `${outputNew1.join('\n')}\n\ndeclare module`);
    // console.log(contentNew);
  }
  contentNew = contentNew.replace(
    'export interface IBeanRecord {',
    `export interface IBeanRecord {\n${outputNew2.join('\n')}`,
  );
  // console.log(contentNew);
  console.log(file);
  await fse.outputFile(file, contentNew);
  await processHelper.formatFile({ fileName: file });
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
  const contentNew = contentOld.replace('import { BeanBase, Controller, Use }', 'import { BeanBase, Controller }');
  // console.log(contentNew);
  await fse.outputFile(file, contentNew);
  await processHelper.formatFile({ fileName: file });
}

async function _moduleHandle_typings({ file, module, processHelper }) {
  console.log(file);
  const contentNew = "import 'vona-suite-a-base';";
  // console.log(contentNew);
  // await fse.outputFile(file, contentNew);
  // await processHelper.formatFile({ fileName: file });
}

async function _moduleHandle_scopeModule({ file, module, processHelper }) {
  // console.log(file);
  const contentOld = (await fse.readFile(file)).toString();
  if (contentOld.indexOf('ScopeModule') > -1) return;
  //
  const scopeModuleName = getScopeModuleName(module.info.relativeName);
  // console.log(scopeModuleName);
  const contentNew = `${contentOld}\n
export { ${scopeModuleName} as ScopeModule } from './scope.js';
  `;
  console.log(contentNew);
  await fse.outputFile(file, contentNew);
  await processHelper.formatFile({ fileName: file });
}

async function _moduleHandle_super({ file, module, processHelper }) {
  const contentOld = (await fse.readFile(file)).toString();
  const matchExport = contentOld.match(/export class .*? extends .*? \{/);
  if (!matchExport) {
    // console.log(file);
    return;
  }
  // 查找constructor
  const ast = gogocode(contentOld, { parseOptions: {} });
  const ast1 = ast.find('constructor($_$) {$$$0}');
  if (ast1.match.length === 0) return;
  const ast1Src = ast1.generate();
  if (ast1Src.indexOf('super(') > -1) return;
  // 添加super
  const ast2 = ast1.replace('constructor($_$) {$$$0}', 'constructor($_$) {\nsuper();\n$$$0\n}');
  const ast2Src = ast2.root().generate();
  // console.log(ast2Src);
  console.log(file);
  await fse.outputFile(file, ast2Src);
  await processHelper.formatFile({ fileName: file });
}

async function _moduleHandle_options({ file, module, processHelper }) {
  const contentOld = (await fse.readFile(file)).toString();
  // 查找constructor
  const ast = gogocode(contentOld, { parseOptions: {} });
  const ast1 = ast.find('async $$$0(options){$$$1}');
  if (ast1.match.length === 0) return;
  // const outAst = await snippet.transform(this.getAstData(ast, snippet));
  const ast1Src = ast1.generate();
  if (ast1Src.replace('(options)', '(_)').indexOf('options') > -1) {
    // console.log(file);
    return;
  }
  const ast2 = ast1.replace('async $_$(options){$$$1}', 'async $_$(_options){\n$$$1\n}');
  const ast2Src = ast2.root().generate();
  // console.log(ast2Src);
  console.log(file);
  await fse.outputFile(file, ast2Src);
  await processHelper.formatFile({ fileName: file });
  return;
  // 查找this参数
  const regexp = /this\.(.*?) = .*?;/g;
  const matches = ast1Src.matchAll(regexp);
  const outputNew1 = [];
  const outputNew2 = [];
  const outputNew3 = [];
  let matchCount = 0;
  for (const match of matches) {
    matchCount++;
    const classNameOld = match[1];
    const classNameNew = `${classNameOld}: any;`;
    if (contentOld.indexOf(classNameNew) === -1) {
      outputNew1.push(classNameNew);
    }
  }
  if (outputNew1.length === 0) {
    return;
  }
  const contentNew = contentOld.replace('constructor(', `${outputNew1.join('\n')}\n\nconstructor(`);
  // console.log(contentNew);
  console.log(file);
  // await fse.outputFile(file, contentNew);
  // await processHelper.formatFile({ fileName: file });
}

async function _moduleHandle_vars({ file, module, processHelper }) {
  const contentOld = (await fse.readFile(file)).toString();
  // 查找constructor
  const ast = gogocode(contentOld, { parseOptions: {} });
  const ast1 = ast.find('constructor() {$$$0}');
  // const outAst = await snippet.transform(this.getAstData(ast, snippet));
  const ast1Src = ast1.generate();
  // 查找this参数
  const regexp = /this\.(.*?) = .*?;/g;
  const matches = ast1Src.matchAll(regexp);
  const outputNew1 = [];
  const outputNew2 = [];
  const outputNew3 = [];
  let matchCount = 0;
  for (const match of matches) {
    matchCount++;
    const classNameOld = match[1];
    const classNameNew = `${classNameOld}: any;`;
    if (contentOld.indexOf(classNameNew) === -1) {
      outputNew1.push(classNameNew);
    }
  }
  if (outputNew1.length === 0) {
    return;
  }
  const contentNew = contentOld.replace('constructor(', `${outputNew1.join('\n')}\n\nconstructor(`);
  // console.log(contentNew);
  console.log(file);
  await fse.outputFile(file, contentNew);
  await processHelper.formatFile({ fileName: file });
}

async function _moduleHandle_thisModule({ file, module, processHelper }) {
  if (file.indexOf('src/resource/this.ts') > -1) return;
  const contentOld = (await fse.readFile(file)).toString();
  if (contentOld.indexOf('__ThisModule__') === -1) return;
  if (contentOld.indexOf('{ __ThisModule__ }') > -1) return;
  const fileThis = `${module.root}/src/resource/this.js`;
  let fileRelative = path.relative(path.dirname(file), fileThis);
  if (fileRelative[0] !== '.') {
    fileRelative = './' + fileRelative;
  }
  let contentNew;
  if (contentOld.indexOf('import ') > -1) {
    contentNew = contentOld.replace('import ', `import { __ThisModule__ } from '${fileRelative}';\nimport `);
  } else {
    contentNew = `import { __ThisModule__ } from '${fileRelative}';\n\n` + contentOld;
  }
  // console.log(contentNew);
  // console.log(file);
  // console.log(fileRelative);
  // await fse.remove(file);
  await fse.outputFile(file, contentNew);
  await processHelper.formatFile({ fileName: file });
}

async function _moduleHandle_bean({ file, module, processHelper }) {
  const contentOld = (await fse.readFile(file)).toString();
  if (contentOld.indexOf('export interface IBeanRecord') === -1) return;
  if (contentOld.indexOf("declare module 'vona'") > -1) return;
  let contentNew = contentOld.replace(
    'export interface IBeanRecord',
    "declare module 'vona' {\nexport interface IBeanRecord",
  );
  contentNew += '}';
  // console.log(contentNew);
  await fse.outputFile(file, contentNew);
  await processHelper.formatFile({ fileName: file });
}

async function _moduleHandle_bean({ file, module, processHelper }) {
  if (!fse.existsSync(file)) {
    console.log('---- not changed: ', module.info.relativeName);
    return;
  }
  const contentOld = (await fse.readFile(file)).toString();
  //
  const classPath = path.basename(file).replace('.ts', '');
  const sceneName = parseSceneName(classPath);
  const classNameNew = classPathToClassName('', classPath);
  const shortName = parseShortName(classPath);
  console.log(classPath, '--', sceneName, '--', classNameNew, '--', shortName);
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
    let beanOptions;
    if (sceneName === 'bean') {
      beanOptions = '';
    } else {
      beanOptions = `{ scene: '${sceneName}' }`;
    }

    const contentNew = `
import { Bean, BeanBase } from 'vona';

${contentMatches[1]}

@Bean(${beanOptions})
export class ${classNameNew} extends BeanBase {
${contentMatches[3]}
  `;
    // console.log(contentNew);
    await fse.outputFile(file, contentNew);
    await processHelper.formatFile({ fileName: file });
  }
  // 2. 查看是否需要在resource/beans.ts中添加记录
  const fileLocals = `${module.root}/src/resource/beans.ts`;
  let contentLocals = (await fse.readFile(fileLocals)).toString();
  if (contentLocals.indexOf(`${classPath}.js`) === -1) {
    needLog = true;
    if (contentLocals.indexOf('export *') === -1) {
      // the first
      if (sceneName === 'bean') {
        contentLocals = `
export * from '../bean/${classPath}.js';

import { ${classNameNew} } from '../bean/${classPath}.js';

export interface IBeanRecord {
  ${shortName}: ${classNameNew};
}
      `;
      } else {
        contentLocals = `
export * from '../bean/${classPath}.js';
              `;
      }
    } else {
      if (sceneName === 'bean') {
        contentLocals = contentLocals
          .replace('export * from', `export * from '../bean/${classPath}.js';\nexport * from`)
          .replace('import {', `import { ${classNameNew} } from '../bean/${classPath}.js';\nimport {`)
          .replace(
            'export interface IBeanRecord {',
            `export interface IBeanRecord {\n  ${shortName}: ${classNameNew};`,
          );
      } else {
        contentLocals = contentLocals.replace(
          'export * from',
          `export * from '../bean/${classPath}.js';\nexport * from`,
        );
      }
    }
    // console.log(contentLocals);
    await fse.outputFile(fileLocals, contentLocals);
    await processHelper.formatFile({ fileName: fileLocals });
  }
  // 3. log
  if (needLog) {
    console.log('--------: ', file);
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
      importBase = "import { BeanAtomBase } from '../bean/virtual.atomBase.js';";
    } else if (contentOld.indexOf('class.AtomCmsBase') > -1) {
      importBase = "import { BeanAtomCmsBase } from 'vona-module-a-cms';";
    } else {
      importBase = "import { BeanAtomBase } from 'vona-module-a-base';";
    }
    const contentNew = `
import { Atom } from 'vona';
${importBase}

${contentMatches[1]}

@Atom()
export class ${classNameNew} extends BeanAtomBase {
${contentMatches[3]}
  `;
    console.log(contentNew);
    await fse.outputFile(file, contentNew);
    await processHelper.formatFile({ fileName: file });
  }
  // 2. 查看是否需要在resource/atoms.ts中添加记录
  const fileLocals = `${module.root}/src/resource/atoms.ts`;
  let contentLocals = (await fse.readFile(fileLocals)).toString();
  if (contentLocals.indexOf(`${classPath}.js`) === -1) {
    needLog = true;
    if (contentLocals.indexOf('export') === -1) {
      // the first
      contentLocals = `
export * from '../atom/${classPath}.js';
      `;
    } else {
      contentLocals = contentLocals.replace('export * from', `export * from '../atom/${classPath}.js';\nexport * from`);
    }
    console.log(contentLocals);
    await fse.outputFile(fileLocals, contentLocals);
    await processHelper.formatFile({ fileName: fileLocals });
  }
  // 3. log
  if (needLog) {
    console.log('--------: ', file);
  }
}

//
async function _moduleHandle_local({ file, module, processHelper }) {
  if (!fse.existsSync(file)) {
    console.log('---- not changed: ', module.info.relativeName);
    return;
  }
  const contentOld = (await fse.readFile(file)).toString();
  //
  const classPath = path.basename(file).replace('.ts', '');
  const classNameNew = classPathToClassName('Local', classPath);
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
    const contentNew = `
import { Local, BeanBase } from 'vona';

${contentMatches[1]}

@Local()
export class ${classNameNew} extends BeanBase {
${contentMatches[3]}
  `;
    // console.log(contentNew);
    await fse.outputFile(file, contentNew);
    await processHelper.formatFile({ fileName: file });
  }
  // 2. 查看是否需要在resource/locals中添加记录
  const fileLocals = `${module.root}/src/resource/locals.ts`;
  let contentLocals = (await fse.readFile(fileLocals)).toString();
  if (contentLocals.indexOf(`{ ${classNameNew} }`) === -1) {
    needLog = true;
    if (contentLocals.indexOf('export') === -1) {
      // the first
      contentLocals = `
export * from '../local/${classPath}.js';

import { ${classNameNew} } from '../local/${classPath}.js';

export interface IModuleService {
  '${classPath}': ${classNameNew};
}
      `;
    } else {
      contentLocals = contentLocals
        .replace('export * from', `export * from '../local/${classPath}.js';\nexport * from`)
        .replace('import {', `import { ${classNameNew} } from '../local/${classPath}.js';\nimport {`)
        .replace(
          'export interface IModuleService {',
          `export interface IModuleService {\n  '${classPath}': ${classNameNew};`,
        );
    }
    // console.log(contentLocals);
    await fse.outputFile(fileLocals, contentLocals);
    await processHelper.formatFile({ fileName: fileLocals });
  }
  // 3. log
  if (needLog) {
    console.log('--------: ', file);
  }
}

async function _moduleHandle_model({ module, processHelper }) {
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
import { BeanModelBase, Model } from 'vona';

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

async function _moduleHandle_appendExtra({ module, processHelper }) {
  const file = `${module.root}/src/resource/models.ts`;
  if (fse.existsSync(file)) {
    console.log('---- not changed: ', module.info.relativeName);
    return;
  }
  const outputNew = `
export interface IModuleModel {}
  `;
  // console.log(outputNew);
  await fse.outputFile(file, outputNew);
  await processHelper.formatFile({ fileName: file });
}

async function _moduleHandle_version2({ file, module, processHelper }) {
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
  // 解析内容
  const contentMatches = contentOld.match(/([\s\S\n]*)module\.exports = class ([\S]*?) [\s\S\n]*?\{([\s\S\n]*)/);
  if (!contentMatches) {
    console.log('---- not matched: ', file);
    return;
  }
  // console.log(contentMatches);
  let contentNew = `
import { Bean, BeanBase } from 'vona';

${contentMatches[1]}

@Bean({ scene: 'version' })
export class ${contentMatches[2]} extends BeanBase {
${contentMatches[3]}
  `;
  contentNew = contentNew
    .replace('const VersionUpdate = require', 'const {VersionUpdate} = await import')
    .replace('const VersionInit = require', 'const {VersionInit} = await import')
    .replace('const VersionTest = require', 'const {VersionTest} = await import');
  console.log(contentNew);
  await fse.outputFile(file, contentNew);
  await processHelper.formatFile({ fileName: file });
}

async function _moduleHandle_eachFile({ module, processHelper }) {
  const pattern = `${module.root}/src/local/**/*.ts`;
  const files = await eggBornUtils.tools.globbyAsync(pattern);
  for (const file of files) {
    // console.log(file);
    const contentOld = (await fse.readFile(file)).toString();
    // console.log(contentOld);
    // const matchExport = contentOld.match(/export /);
    // if (matchExport) {
    //   // console.log('---- not changed: ', module.info.relativeName);
    //   return;
    // }
    if (contentOld.indexOf('const moduleInfo = module.info;') === -1) {
      continue;
    }
    console.log(file);
    const contentNew = contentOld
      .replace("from 'vona';", "from 'vona';\nimport { __ThisModule__ } from '../.metadata/this.js';")
      .replace('// const moduleInfo = module.info;', '')
      .replace('const moduleInfo = module.info;', '')
      .replaceAll('moduleInfo.relativeName', '__ThisModule__');
    console.log(contentNew);
    await fse.outputFile(file, contentNew);
    await processHelper.formatFile({ fileName: file });
  }
}

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
      importName = " import { BeanModuleScopeBase } from 'vona';";
    } else if (extendName === 'BeanBase') {
      importName = "import { BeanBase } from 'vona';";
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
import { Bean } from 'vona';

@Bean()
export class ${currentClassName} extends ${names[names.length - 1].classNameNew} {

}
  `;
  console.log(outputNew);
  // process.exit(0);
  await fse.outputFile(file, outputNew);
  await processHelper.formatFile({ fileName: file });
}

async function _moduleHandle_local({ module, processHelper }) {
  const file = `${module.root}/src/resource/locals.ts`;
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
  const regexp = /const (.*?) =.*service\/(.*?)\.js/g;
  const matches = contentOld.matchAll(regexp);
  const outputNew1 = [];
  const outputNew2 = [];
  const outputNew3 = [];
  for (const match of matches) {
    const classNameOld = match[1];
    const classPath = match[2];
    if (classNameOld.indexOf('.') > -1) {
      console.log('has . :', module.info.relativeName);
      return;
    }
    const classNameNew = classPathToClassName('Local', classPath);
    // console.log(classNameOld, classPath, classNameNew);
    // locals.ts
    outputNew1.push(`export * from '../local/${classPath}.js';`);
    outputNew2.push(`import { ${classNameNew} } from '../local/${classPath}.js';`);
    outputNew3.push(`${classNameOld}: ${classNameNew};`);
    // local
    const classFile = `${module.root}/src/local/${classPath}.ts`;
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
    const contentMatches = classContent.match(/([\s\S\n]*)module\.exports = class ([\S]*) (\{[\s\S\n]*)/);
    if (!contentMatches) {
      console.log('---- not matched: ', classFile);
      return;
    }
    // console.log(contentMatches);
    const contentNew = `
import { BeanBase, Local } from 'vona';

${contentMatches[1]}

@Local()
export class ${classNameNew} extends BeanBase ${contentMatches[3]}
    `;
    // console.log(contentNew);
    await fse.outputFile(classFile, contentNew);
    await processHelper.formatFile({ fileName: classFile });
  }
  const outputNew = `
${outputNew1.join('\n')}

${outputNew2.join('\n')}

export interface IModuleService {
  ${outputNew3.join('\n')}
}
  `;
  // console.log(outputNew);
  await fse.outputFile(file, outputNew);
  await processHelper.formatFile({ fileName: file });
}

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

async function _moduleHandle_local({ module, processHelper }) {
  const file = `${module.root}/src/locals.ts`;
  if (!fse.existsSync(file)) {
    console.log('---- not changed: ', module.info.relativeName);
    return;
  }
  // console.log(file);
  // await fse.move(file, `${module.root}/src/resource/locals.ts`);
  // await fse.remove(file);
}

async function _moduleHandle_config({ module, processHelper }) {
  const file = `${module.root}/src/config/config.ts`;
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
  const regexp = /config\.(.*) = ([\s\S\n]*?);/g;
  const matches = contentOld.matchAll(regexp);
  const outputNew1 = [];
  const outputNew2 = [];
  for (const match of matches) {
    const classNameOld = match[1];
    const classPath = match[2];
    if (classNameOld.indexOf('.') > -1) {
      console.log('has . :', module.info.relativeName);
      return;
    }
    // console.log(classNameOld, classPath);
    outputNew1.push(`${classNameOld} : ${classPath},`);
  }
  const outputNew = `
  export const config = _app => {
    return {
      ${outputNew1.join('\n')}
    };
  };
  `;
  // console.log(outputNew);
  await fse.outputFile(file, outputNew);
  await processHelper.formatFile({ fileName: file });
}

async function _moduleHandle_errors3({ module, processHelper }) {
  const fileZh = `${module.root}/src/config/locale/zh-cn.ts`;
  const contentZh = (await fse.readFile(fileZh)).toString();
  // console.log(contentZh);
  // files
  const pattern = `${module.root}/**/*.ts`;
  const files = await eggBornUtils.tools.globbyAsync(pattern);
  for (const file of files) {
    const contentOld = (await fse.readFile(file)).toString();
    const matches = contentOld.matchAll(/.text\(('[^']* [^']*')\)/g);
    for (const match of matches) {
      const errorName = match[1];
      if (contentZh.indexOf(errorName) === -1) {
        console.log(errorName);
      }
    }
  }
}

async function _moduleHandle_errors2({ module, processHelper }) {
  const file = `${module.root}/src/config/errors.ts`;
  if (!fse.existsSync(file)) {
    console.log('---- not changed: ', module.info.relativeName);
    return;
  }
  let contentOld = (await fse.readFile(file)).toString();
  const regexp = /('[^']*') = (\d*)/g;
  const matches = contentOld.matchAll(regexp);
  const errorNames = [];
  const errorNamesNew = [];
  for (const match of matches) {
    const errorName = match[1];
    const errorCode = match[2];
    if (errorName.indexOf(' ') === -1) continue;
    console.log(`${errorName}, ${errorCode}`);
    let errorNameNew = errorName
      .replaceAll('%s', ' ')
      .replaceAll('%d', ' ')
      .replaceAll(':', ' ')
      .replaceAll(',', ' ')
      .replaceAll('!', ' ')
      .replaceAll('.', ' ')
      .replaceAll('?', ' ')
      .replaceAll('-', ' ');
    const parts = errorNameNew
      .split(' ')
      .filter(item => !!item)
      .map(item => {
        return item.charAt(0).toUpperCase() + item.substring(1);
      });
    errorNameNew = parts.join('');
    if (errorName.indexOf('%') > -1) {
      errorNameNew = errorNameNew.substring(0, errorNameNew.length - 1) + "__'";
    }
    console.log(errorNameNew);
    errorNames.push(errorName);
    errorNamesNew.push(errorNameNew);
    // outputNew1.push(`${classPath} = ${classNameOld},`);
  }
  if (errorNames.length === 0) return;
  // en-us
  const fileEn = `${module.root}/src/config/locale/en-us.ts`;
  let contentEn = (await fse.readFile(fileEn)).toString();
  const fileZh = `${module.root}/src/config/locale/zh-cn.ts`;
  let contentZh = (await fse.readFile(fileZh)).toString();
  for (let index = 0; index < errorNames.length; index++) {
    const errorName = errorNames[index];
    const errorNameNew = errorNamesNew[index];
    contentEn = contentEn.replace('};', `${errorNameNew.replaceAll("'", '')}: ${errorName},\n};`);
    contentZh = contentZh.replace(errorName, errorNameNew.replaceAll("'", ''));
    contentOld = contentOld.replace(errorName, errorNameNew);
  }
  console.log('---------------');
  console.log(contentEn);
  console.log(contentZh);
  console.log(contentOld);

  // console.log(outputNew);
  await fse.outputFile(fileEn, contentEn);
  await processHelper.formatFile({ fileName: fileEn });
  await fse.outputFile(fileZh, contentZh);
  await processHelper.formatFile({ fileName: fileZh });
  await fse.outputFile(file, contentOld);
  await processHelper.formatFile({ fileName: file });
}

async function _moduleHandle_locales2({ module, processHelper }) {
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
  await fse.outputFile(file, contentNew);
  await processHelper.formatFile({ fileName: file });
  //
  const file2 = `${module.root}/src/config/locales.ts`;
  const contentOld = (await fse.readFile(file2)).toString();
  const outputNew = contentOld
    .replace(
      'import zh_cn',
      `import en_us from './locale/en-us.js';
  import zh_cn`,
    )
    .replace(
      "'zh-cn': zh_cn,",
      `'en-us': en_us,
  'zh-cn': zh_cn,`,
    );

  console.log(outputNew);
  await fse.outputFile(file2, outputNew);
  await processHelper.formatFile({ fileName: file2 });
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
import { BeanBase, Controller, Use } from 'vona';
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
  // pkgNew.cabloyModule = pkgOld.cabloyModule;
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
  // if (pkgOld.cabloyModule.cms) {
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
  //   "path": "src/module/${module.package.name.substring('vona-module-'.length)}"
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
