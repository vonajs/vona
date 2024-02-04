"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModuleTools = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const module_glob_1 = require("@cabloy/module-glob");
const beanSimple_js_1 = require("../bean/beanSimple.js");
class ModuleTools extends beanSimple_js_1.BeanSimple {
    async prepare() {
        const app = this.app;
        // all modules
        const { suites, modules, modulesArray, modulesMonkey } = await (0, module_glob_1.glob)({
            projectPath: path_1.default.join(app.options.baseDir, '../..'),
            disabledModules: app.config.disabledModules,
            disabledSuites: app.config.disabledSuites,
            log: !!app.meta.inAgent,
            type: 'backend',
            loadPackage: true,
        });
        app.meta.suites = suites;
        app.meta.modules = modules;
        app.meta.modulesArray = modulesArray;
        app.meta.modulesMonkey = modulesMonkey;
        // app monkey
        const pathAppMonkey = path_1.default.resolve(app.options.baseDir, 'config/monkey.js');
        if (fs_extra_1.default.existsSync(pathAppMonkey)) {
            const AppMonkey = require(pathAppMonkey);
            app.meta.appMonkey = app.bean._newBean(AppMonkey);
        }
        return modules;
    }
    async load() {
        const app = this.app;
        // 1. import
        const promises = [];
        for (const module of app.meta.modulesArray) {
            const subPath = app.meta.isTest || app.meta.isLocal ? 'src' : 'dist';
            promises.push(import(`${module.root}/${subPath}/index.js`));
        }
        const timeBegin = new Date();
        const modulesResource = await Promise.all(promises);
        const timeEnd = new Date();
        console.log(`import modules end, pid: ${process.pid}: ${(timeEnd.valueOf() - timeBegin.valueOf()) / 1000}s`);
        for (let i = 0; i < modulesResource.length; i++) {
            const module = app.meta.modulesArray[i];
            module.resource = modulesResource[i];
        }
        // 2. main
        for (const module of app.meta.modulesArray) {
            if (module.resource.Main) {
                module.main = app.bean._newBean(module.resource.Main);
            }
        }
        // 3. monkey
        for (const key in app.meta.modulesMonkey) {
            const moduleMonkey = app.meta.modulesMonkey[key];
            if (moduleMonkey.resource.Monkey) {
                moduleMonkey.monkey = app.bean._newBean(moduleMonkey.resource.Monkey);
            }
        }
    }
    async monkey(monkeyName) {
        const app = this.app;
        for (const module of app.meta.modulesArray) {
            await app.meta.util.monkeyModule(app.meta.appMonkey, app.meta.modulesMonkey, monkeyName, { module });
        }
    }
}
exports.ModuleTools = ModuleTools;
//# sourceMappingURL=module.js.map