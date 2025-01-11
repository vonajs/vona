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
const utils_1 = require("@cabloy/utils");
__exportStar(require("./interface.js"), exports);
const SymbolModuleOrdering = Symbol('SymbolModuleOrdering');
const boxenOptions = {
    padding: 1,
    margin: 1,
    align: 'center',
    borderColor: 'yellow',
    borderStyle: 'round',
};
// type: front/backend
async function glob(options) {
    const { projectPath, disabledModules, disabledSuites, log, projectMode, meta } = options;
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
        modulesSync: {},
        modulesIcon: {},
        //
        suitesLocal: {},
        suitesVendor: {},
        //
        disabledModules: __getDisabledModules(disabledModules),
        disabledSuites: __getDisabledSuites(disabledSuites),
        meta,
        //
        pathsMeta: (0, meta_js_1.getPathsMeta)(projectMode),
    };
    // parse suites
    const suites = __parseSuites(context, projectPath);
    // parse modules
    const modules = __parseModules(context, projectPath);
    // load package
    await __loadPackage(context, suites);
    await __loadPackage(context, modules);
    // bind suites modules
    __bindSuitesModules(suites, modules);
    // check suites
    __checkSuites(context, suites);
    // order
    __orderModules(context, modules);
    // log
    __logModules(context, log);
    __logSuites(context, log);
    // ok
    return {
        suites: context.suites,
        modules: context.modules,
        modulesArray: context.modulesArray,
        //
        // modulesLocal: context.modulesLocal,
        // modulesGlobal: context.modulesGlobal,
        // modulesMonkey: context.modulesMonkey,
        //
        // suitesLocal: context.suitesLocal,
        // suitesVendor: context.suitesVendor,
    };
}
exports.glob = glob;
function getPackageModuleNode(projectMode) {
    return ['zova', 'vona'].includes(projectMode) ? `${projectMode}Module` : 'cabloyModule';
}
async function __loadPackage(context, modules) {
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
        const module = modules[moduleName];
        module.package = JSON.parse(modulesPackage[i].toString());
        const moduleNode = getPackageModuleNode(context.options.projectMode);
        const capabilities = module.package[moduleNode]?.capabilities;
        module.info.capabilities = capabilities;
    }
}
function __orderModules(context, modules) {
    // 'a-version' first
    if (modules['a-version']) {
        __pushModule(context, modules, 'a-version');
    }
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
    // module
    const module = modules[moduleRelativeName];
    // check if disable
    if (context.disabledModules[moduleRelativeName])
        return false;
    // check meta
    const capabilities = module.package.zovaModule?.capabilities ?? module.package.vonaModule?.capabilities;
    if (context.meta && capabilities && !(0, utils_1.checkMeta)(capabilities.meta, context.meta))
        return false;
    // ordering
    if (module[SymbolModuleOrdering])
        return true;
    module[SymbolModuleOrdering] = true;
    // dependencies
    if (!__orderDependencies(context, modules, module, moduleRelativeName)) {
        context.disabledModules[moduleRelativeName] = true;
        return false;
    }
    // push this
    context.modules[moduleRelativeName] = module;
    const moduleNode = getPackageModuleNode(context.options.projectMode);
    if (module.package && module.package[moduleNode] && module.package[moduleNode].last === true) {
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
    const moduleNode = getPackageModuleNode(context.options.projectMode);
    if (!module.package[moduleNode] || !module.package[moduleNode].dependencies)
        return true;
    let enabled = true;
    const dependencies = module.package[moduleNode].dependencies;
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
function __parseModules(context, projectPath) {
    const modules = {};
    for (const __path of context.pathsMeta.modules) {
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
            const info = (0, module_info_1.parseInfoPro)(name, context.options.projectMode, 'module');
            if (!info) {
                throw new Error(`module name is not valid: ${name}`);
            }
            // check if exists
            if (modules[info.relativeName])
                continue;
            // info
            info.vendor = __path.vendor;
            info.node_modules = __path.node_modules;
            info.originalName = name;
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
        if (module.info.capabilities?.monkey) {
            context.modulesMonkey[relativeName] = module;
        }
        if (module.info.capabilities?.sync) {
            context.modulesSync[relativeName] = module;
        }
        if (module.info.capabilities?.icon) {
            context.modulesIcon[relativeName] = module;
        }
        if (module.info.node_modules) {
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
    console.log(chalk_1.default.yellow('\n=== Sync Modules ==='));
    for (const key in context.modulesSync) {
        console.log(chalk_1.default.cyan('> ' + key));
    }
    console.log(chalk_1.default.yellow('\n=== Icon Modules ==='));
    for (const key in context.modulesIcon) {
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
    if (!disabledModules)
        return disabledModulesMap;
    if (typeof disabledModules === 'string')
        disabledModules = disabledModules.split(',');
    for (const moduleName of disabledModules) {
        disabledModulesMap[moduleName] = true;
    }
    return disabledModulesMap;
}
function __getDisabledSuites(disabledSuites) {
    const disabledSuitesMap = {};
    if (!disabledSuites)
        return disabledSuitesMap;
    if (typeof disabledSuites === 'string')
        disabledSuites = disabledSuites.split(',');
    for (const suiteName of disabledSuites) {
        disabledSuitesMap[suiteName] = true;
    }
    return disabledSuitesMap;
}
function __parseSuites(context, projectPath) {
    const suites = {};
    for (const __path of context.pathsMeta.suites) {
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
            const info = (0, module_info_1.parseInfoPro)(name, context.options.projectMode, 'suite');
            if (!info) {
                throw new Error(`suite name is not valid: ${name}`);
            }
            // check if exists
            if (suites[info.relativeName])
                continue;
            // info
            info.vendor = __path.vendor;
            info.node_modules = __path.node_modules;
            info.originalName = name;
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
//# sourceMappingURL=index.js.map