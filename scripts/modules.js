const fse = require('fs-extra');
const fs = require('node:fs/promises');
const { ProcessHelper } = require('@cabloy/process-helper');
const { glob } = require('@cabloy/module-glob');
const eggBornUtils = require('egg-born-utils');
const argv = require('./lib/parse_argv')('sync');
const path = require('node:path');
const gogocode = require('gogocode');
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

(async function () {
  await main();
  pg.destroy();
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

function _coerceColumnValue(type) {
  if (['bit', 'bool', 'boolean'].includes(type)) return 'boolean';
  if (['int'].includes(type)) return 'number';
  if (_columnTypePrefixes(type, ['timestamp'])) return 'Date';
  if (_columnTypePrefixes(type, ['float', 'double'])) return 'number';
  if (_columnTypePrefixes(type, ['tinyint', 'smallint', 'mediumint', 'bigint', 'numeric', 'integer'])) {
    return 'number';
  }
  if (type === 'json') return 'object';
  return 'string';
}

function _columnTypePrefixes(type, prefixes) {
  return prefixes.some(prefix => type.indexOf(prefix) > -1);
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
  const contentNew = `import { ${classBase} } from '@cabloy/core';

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

async function _moduleHandle({ module, processHelper }) {
  // if (module.suite) return;
  // console.log(module.info.relativeName);
  // const fileFrom = `${module.root}/tsconfig.json`;
  // const fileTo = `${module.root}/tsconfig.build.json`;

  // const contentNew = `
  // {
  //   "extends": "../../tsconfig.base.json",
  //   "compilerOptions": {
  //     "rootDir": "src",
  //     "outDir": "dist"
  //   },
  //   "include": ["src/**/*.ts", "src/**/*.json"]
  // }

  // `;
  const pattern = `${module.root}/src/model`;
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
    await _moduleHandle_model({ file, module, processHelper });
  }
}

async function _suiteHandle({ modules, suite, processHelper }) {
  // console.log(suite.root);
  const fileFrom = `${suite.root}/tsconfig.base.json`;
  // const fileTo = `${suite.root}/tsconfig.json`;
  // if (!fse.existsSync(fileTo)) {
  //  await fse.move(fileFrom, fileTo);
  // }
  const contentNew = `
  {
    "extends": "../../../tsconfig.base.json",
    "compilerOptions": {}
  }
  `;
  // await fse.outputFile(fileFrom, contentNew);
  // await processHelper.formatFile({ fileName: fileFrom });
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
