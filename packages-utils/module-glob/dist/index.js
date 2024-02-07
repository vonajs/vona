"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.glob = void 0;
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const semver_1 = __importDefault(require("semver"));
const chalk_1 = __importDefault(require("chalk"));
const boxen_1 = __importDefault(require("boxen"));
const egg_born_utils_1 = __importDefault(require("egg-born-utils"));
const meta_js_1 = require("./meta.js");
const module_info_1 = require("@cabloy/module-info");
__exportStar(require("./interface.js"), exports);
const boxenOptions = {
    padding: 1,
    margin: 1,
    align: 'center',
    borderColor: 'yellow',
    borderStyle: 'round',
};
// type: front/backend/all
async function glob(options) {
    const { projectPath, disabledModules, disabledSuites, log, type, loadPackage } = options;
    // context
    const context = {
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
    if (type === 'backend' && loadPackage !== false) {
        __orderModules(context, modules);
    }
    else {
        context.modules = modules;
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
exports.glob = glob;
async function __loadPackage(modules) {
    const promises = [];
    const modulesArray = [];
    for (const moduleName in modules) {
        const module = modules[moduleName];
        promises.push(fs_extra_1.default.readFile(module.pkg));
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
    if (context.disabledModules[moduleRelativeName])
        return false;
    // module
    const module = modules[moduleRelativeName];
    if (module.__ordering)
        return true;
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
    }
    else {
        context.modulesArray.push(module);
    }
    return true;
}
function __orderDependencies(context, modules, module, moduleRelativeName) {
    if (context.options.disableCheckDependencies)
        return true;
    if (!module.package.eggBornModule || !module.package.eggBornModule.dependencies)
        return true;
    let enabled = true;
    const dependencies = module.package.eggBornModule.dependencies;
    for (const key in dependencies) {
        const subModule = modules[key];
        if (!subModule) {
            const message = chalk_1.default.keyword('orange')(`module ${moduleRelativeName} disabled`) +
                ', because ' +
                chalk_1.default.keyword('cyan')(`module ${key} not exists`);
            console.log('\n' + (0, boxen_1.default)(message, boxenOptions) + '\n');
            enabled = false; // process.exit(0);
            continue;
        }
        const subModuleVersion = dependencies[key];
        if (semver_1.default.lt(subModule.package.version, subModuleVersion)) {
            console.warn(chalk_1.default.cyan(`module ${key} is old`));
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
    const modules = {};
    for (const __path of meta_js_1.__pathsModules) {
        const prefix = `${projectPath}/${__path.prefix}`;
        const filePkgs = egg_born_utils_1.default.tools.globbySync(`${prefix}*/package.json`);
        for (const filePkg of filePkgs) {
            // name
            const name = filePkg.split('/').slice(-2)[0];
            // check if '-' prefix exists
            if (name.substring(0, 1) === '-') {
                // skip
                continue;
            }
            // info
            const info = (0, module_info_1.parseInfo)(name, 'module');
            if (!info) {
                throw new Error(`module name is not valid: ${name}`);
            }
            // check if exists
            if (modules[info.relativeName])
                continue;
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
            const root = path_1.default.dirname(filePkg);
            const module = {
                name,
                info,
                root,
                pkg: filePkg,
            };
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
        }
        else {
            context.modulesLocal[relativeName] = module;
        }
    }
    if (!log)
        return;
    // log
    console.log(chalk_1.default.yellow('\n=== Local Modules ==='));
    for (const key in context.modulesLocal) {
        console.log(chalk_1.default.cyan('> ' + key));
    }
    console.log(chalk_1.default.yellow('\n=== Global Modules ==='));
    for (const key in context.modulesGlobal) {
        console.log(chalk_1.default.cyan('> ' + key));
    }
    console.log(chalk_1.default.yellow('\n=== Monkey Modules ==='));
    for (const key in context.modulesMonkey) {
        console.log(chalk_1.default.cyan('> ' + key));
    }
    console.log(chalk_1.default.keyword('orange')(`\n=== Total Modules: ${context.modulesArray.length} ===`));
    // console.log('\n');
}
function __logSuites(context, log) {
    for (const suiteName in context.suites) {
        const suite = context.suites[suiteName];
        if (suite.info.vendor) {
            context.suitesVendor[suiteName] = suite;
        }
        else {
            context.suitesLocal[suiteName] = suite;
        }
    }
    if (!log)
        return;
    // log
    console.log(chalk_1.default.yellow('\n=== Local Suites ==='));
    for (const key in context.suitesLocal) {
        console.log(chalk_1.default.cyan('> ' + key));
    }
    console.log(chalk_1.default.yellow('\n=== Vendor Suites ==='));
    for (const key in context.suitesVendor) {
        console.log(chalk_1.default.cyan('> ' + key));
    }
    console.log(chalk_1.default.keyword('orange')(`\n=== Total Suites: ${Object.keys(context.suites).length} ===`));
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
    const suites = {};
    for (const __path of meta_js_1.__pathSuites) {
        const prefix = `${projectPath}/${__path.prefix}`;
        const filePkgs = egg_born_utils_1.default.tools.globbySync(`${prefix}*/package.json`);
        for (const filePkg of filePkgs) {
            // name
            const name = filePkg.split('/').slice(-2)[0];
            // check if '-' prefix exists
            if (name.substring(0, 1) === '-') {
                // skip
                continue;
            }
            // info
            const info = (0, module_info_1.parseInfo)(name, 'suite');
            if (!info) {
                throw new Error(`suite name is not valid: ${name}`);
            }
            // check if exists
            if (suites[info.relativeName])
                continue;
            // info
            info.vendor = __path.vendor;
            info.node_modules = __path.node_modules;
            // suite
            const root = path_1.default.dirname(filePkg);
            const suite = {
                name,
                info,
                root,
                pkg: filePkg,
                modules: [],
            };
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
        if (!res)
            continue;
        // suiteName
        const suiteName = res[1];
        const suite = suites[suiteName];
        if (!suite) {
            // means disabled
            delete modules[moduleName];
        }
        else {
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
        }
        else {
            // disabledModules
            for (const moduleName of suite.modules) {
                context.disabledModules[moduleName] = true;
            }
        }
    }
}
async function __loadCabloyConfig() {
    const __cabloyConfig = egg_born_utils_1.default.cabloyConfig;
    const { config } = await __cabloyConfig.load();
    return config;
}
//# sourceMappingURL=index.js.map