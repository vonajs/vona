import path from 'path';
import fse from 'fs-extra';
import semver from 'semver';
import chalk from 'chalk';
import boxen from 'boxen';
import eggBornUtils from 'egg-born-utils';
import { __pathSuites, __pathsModules } from './meta.js';
import { IModuleGlobContext, IModuleGlobOptions } from './interface.js';
import { IModule, IModulePackage, ISuite, ISuiteModuleBase, parseInfo } from '@cabloy/module-info';
export * from './interface.js';

const boxenOptions: boxen.Options = {
  padding: 1,
  margin: 1,
  align: 'center',
  borderColor: 'yellow',
  borderStyle: boxen.BorderStyle.Round,
};

// type: front/backend/all
export async function glob(options: IModuleGlobOptions) {
  const { projectPath, disabledModules, disabledSuites, log, type, loadPackage } = options;
  // context
  const context: IModuleGlobContext = {
    options,
    suites: {},
    modules: {},
    modulesArray: [],
    modulesLast: [],
    //
    modulesLocal: {},
    modulesGlobal: {},
    modulesMonkey: {},
    //
    suitesLocal: {},
    suitesVendor: {},
    //
    disabledModules: __getDisabledModules(disabledModules),
    disabledSuites: __getDisabledSuites(disabledSuites),
  };

  // cabloy config
  const cabloyConfig = await __loadCabloyConfig();

  // parse suites
  const suites = __parseSuites(projectPath);
  // parse modules
  const modules = __parseModules(projectPath, cabloyConfig);
  // load package
  if (loadPackage !== false) {
    await __loadPackage(suites);
    await __loadPackage(modules);
  }
  // bind suites modules
  __bindSuitesModules(suites, modules);

  // check suites
  __checkSuites(context, suites);

  // order
  if (type === 'backend') {
    __orderModules(context, modules);
  }
  // log
  __logModules(context, log);
  __logSuites(context, log);

  // ok
  return {
    suites: context.suites,
    modules: context.modules,
    modulesArray: context.modulesArray,
    //
    modulesLocal: context.modulesLocal,
    modulesGlobal: context.modulesGlobal,
    modulesMonkey: context.modulesMonkey,
    //
    suitesLocal: context.suitesLocal,
    suitesVendor: context.suitesVendor,
  };
}

async function __loadPackage(modules: Record<string, ISuiteModuleBase>) {
  const promises: Promise<IModulePackage>[] = [];
  const modulesArray: string[] = [];
  for (const moduleName in modules) {
    const module = modules[moduleName];
    promises.push(fse.readFile(module.pkg));
    modulesArray.push(moduleName);
  }
  const modulesPackage = await Promise.all(promises);
  for (let i = 0; i < modulesPackage.length; i++) {
    const moduleName = modulesArray[i];
    modules[moduleName].package = JSON.parse(modulesPackage[i].toString());
  }
}

function __orderModules(context, modules) {
  // 'a-version' first
  __pushModule(context, modules, 'a-version');
  // others
  for (const key in modules) {
    if (key !== 'a-version') {
      __pushModule(context, modules, key);
    }
  }
  // combine last
  for (const module of context.modulesLast) {
    context.modulesArray.push(module);
  }
}

function __pushModule(context, modules, moduleRelativeName) {
  // check if disable
  if (context.disabledModules[moduleRelativeName]) return false;

  // module
  const module = modules[moduleRelativeName];
  if (module.__ordering) return true;
  module.__ordering = true;

  // dependencies
  if (!__orderDependencies(context, modules, module, moduleRelativeName)) {
    context.disabledModules[moduleRelativeName] = true;
    return false;
  }

  // push this
  context.modules[moduleRelativeName] = module;
  if (module.package && module.package.eggBornModule && module.package.eggBornModule.last === true) {
    context.modulesLast.push(module);
  } else {
    context.modulesArray.push(module);
  }

  return true;
}

function __orderDependencies(context, modules, module, moduleRelativeName) {
  if (context.options.disableCheckDependencies) return true;
  if (!module.package.eggBornModule || !module.package.eggBornModule.dependencies) return true;

  let enabled = true;

  const dependencies = module.package.eggBornModule.dependencies;
  for (const key in dependencies) {
    const subModule = modules[key];
    if (!subModule) {
      const message =
        chalk.keyword('orange')(`module ${moduleRelativeName} disabled`) +
        ', because ' +
        chalk.keyword('cyan')(`module ${key} not exists`);
      console.log('\n' + boxen(message, boxenOptions) + '\n');
      enabled = false; // process.exit(0);
      continue;
    }

    const subModuleVersion = dependencies[key];
    if (semver.lt(subModule.package.version, subModuleVersion)) {
      console.warn(chalk.cyan(`module ${key} is old`));
      process.exit(0);
    }

    if (!__pushModule(context, modules, key)) {
      enabled = false;
    }
  }

  return enabled;
}

function __parseModules(projectPath, cabloyConfig) {
  const entities = cabloyConfig.source?.entities;
  const modules: Record<string, IModule> = {};
  for (const __path of __pathsModules) {
    const prefix = `${projectPath}/${__path.prefix}`;
    const filePkgs = eggBornUtils.tools.globbySync(`${prefix}*/package.json`);
    for (const filePkg of filePkgs) {
      // name
      const name = filePkg.split('/').slice(-2)[0];
      // check if '-' prefix exists
      if (name.substring(0, 1) === '-') {
        // skip
        continue;
      }
      // info
      const info = parseInfo(name, 'module');
      if (!info) {
        throw new Error(`module name is not valid: ${name}`);
      }
      // todo:
      if (info.relativeName !== 'a-version') continue;
      // check if exists
      if (modules[info.relativeName]) continue;
      // info
      info.vendor = __path.vendor;
      info.source = __path.source;
      info.node_modules = __path.node_modules;
      // source
      const entity = entities?.[info.relativeName];
      if (entity === true || entity === false) {
        info.source = entity;
      }
      // resource
      const root = path.dirname(filePkg);
      const module = {
        name,
        info,
        root,
        pkg: filePkg,
      } as IModule;
      // record
      modules[info.relativeName] = module;
    }
  }
  return modules;
}

function __logModules(context, log) {
  for (const module of context.modulesArray) {
    const relativeName = module.info.relativeName;
    if (module.info.monkey) {
      context.modulesMonkey[relativeName] = module;
    }
    if (module.info.public) {
      context.modulesGlobal[relativeName] = module;
    } else {
      context.modulesLocal[relativeName] = module;
    }
  }
  if (!log) return;
  // log
  console.log(chalk.yellow('\n=== Local Modules ==='));
  for (const key in context.modulesLocal) {
    console.log(chalk.cyan('> ' + key));
  }
  console.log(chalk.yellow('\n=== Global Modules ==='));
  for (const key in context.modulesGlobal) {
    console.log(chalk.cyan('> ' + key));
  }
  console.log(chalk.yellow('\n=== Monkey Modules ==='));
  for (const key in context.modulesMonkey) {
    console.log(chalk.cyan('> ' + key));
  }
  console.log(chalk.keyword('orange')(`\n=== Total Modules: ${context.modulesArray.length} ===`));
  // console.log('\n');
}

function __logSuites(context, log) {
  for (const suiteName in context.suites) {
    const suite = context.suites[suiteName];
    if (suite.info.vendor) {
      context.suitesVendor[suiteName] = suite;
    } else {
      context.suitesLocal[suiteName] = suite;
    }
  }
  if (!log) return;
  // log
  console.log(chalk.yellow('\n=== Local Suites ==='));
  for (const key in context.suitesLocal) {
    console.log(chalk.cyan('> ' + key));
  }
  console.log(chalk.yellow('\n=== Vendor Suites ==='));
  for (const key in context.suitesVendor) {
    console.log(chalk.cyan('> ' + key));
  }
  console.log(chalk.keyword('orange')(`\n=== Total Suites: ${Object.keys(context.suites).length} ===`));
  console.log('\n');
}

function __getDisabledModules(disabledModules) {
  const disabledModulesMap = {};
  if (disabledModules && disabledModules.length > 0) {
    for (const moduleName of disabledModules) {
      disabledModulesMap[moduleName] = true;
    }
  }
  return disabledModulesMap;
}

function __getDisabledSuites(disabledSuites) {
  const disabledSuitesMap = {};
  if (disabledSuites && disabledSuites.length > 0) {
    for (const suiteName of disabledSuites) {
      disabledSuitesMap[suiteName] = true;
    }
  }
  return disabledSuitesMap;
}

function __parseSuites(projectPath) {
  const suites: Record<string, ISuite> = {};
  for (const __path of __pathSuites) {
    const prefix = `${projectPath}/${__path.prefix}`;
    const filePkgs = eggBornUtils.tools.globbySync(`${prefix}*/package.json`);
    for (const filePkg of filePkgs) {
      // name
      const name = filePkg.split('/').slice(-2)[0];
      // check if '-' prefix exists
      if (name.substring(0, 1) === '-') {
        // skip
        continue;
      }
      // info
      const info = parseInfo(name, 'suite');
      if (!info) {
        throw new Error(`suite name is not valid: ${name}`);
      }
      // check if exists
      if (suites[info.relativeName]) continue;
      // info
      info.vendor = __path.vendor;
      // suite
      const root = path.dirname(filePkg);
      const suite = {
        name,
        info,
        root,
        pkg: filePkg,
        modules: [],
      } as unknown as ISuite;
      // record
      suites[info.relativeName] = suite;
    }
  }
  // ok
  return suites;
}

const __suite_pattern1 = /src\/suite\/([^\/]+)\/modules/;
const __suite_pattern2 = /src\/suite-vendor\/([^\/]+)\/modules/;
function __bindSuitesModules(suites, modules) {
  for (const moduleName in modules) {
    const module = modules[moduleName];
    // check
    let res = module.root.match(__suite_pattern1);
    if (!res) {
      res = module.root.match(__suite_pattern2);
    }
    if (!res) continue;
    // suiteName
    const suiteName = res[1];
    const suite = suites[suiteName];
    if (!suite) {
      // means disabled
      delete modules[moduleName];
    } else {
      // bind
      module.suite = suiteName;
      suite.modules.push(moduleName);
    }
  }
}

function __checkSuites(context, suites) {
  for (const key in suites) {
    const suite = suites[key];
    // check if disable
    if (!context.disabledSuites[key]) {
      context.suites[key] = suite;
    } else {
      // disabledModules
      for (const moduleName of suite.modules) {
        context.disabledModules[moduleName] = true;
      }
    }
  }
}

async function __loadCabloyConfig() {
  const __cabloyConfig = eggBornUtils.cabloyConfig;
  const { config } = await __cabloyConfig.load();
  return config;
}
