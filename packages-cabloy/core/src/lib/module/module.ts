import fse from 'fs-extra';
import path from 'path';
import { glob } from '@cabloy/module-glob';
import { IModule, IModuleResource } from '../../types/index.js';
import { BeanSimple } from '../bean/beanSimple.js';

export class ModuleTools extends BeanSimple {
  async prepare(): Promise<Record<string, IModule>> {
    const app = this.app;
    // all modules
    const { suites, modules, modulesArray } = await glob({
      projectPath: path.join(app.options.baseDir, '../..'),
      disabledModules: app.config.disabledModules,
      disabledSuites: app.config.disabledSuites,
      log: !!app.meta.inAgent,
      type: 'backend',
      loadPackage: true,
    });
    app.meta.suites = suites;
    app.meta.modules = modules;
    app.meta.modulesArray = modulesArray;
    app.meta.modulesMonkey = {};
    // app monkey
    let pathAppMonkey;
    if (app.meta.isTest || app.meta.isLocal) {
      pathAppMonkey = path.resolve(process.cwd(), 'src/backend/config/monkey.mts');
    } else {
      pathAppMonkey = path.resolve(app.options.baseDir, 'config/monkey.mjs');
    }
    if (fse.existsSync(pathAppMonkey)) {
      const AppMonkey = await import(pathAppMonkey);
      app.meta.appMonkey = app.bean._newBean(AppMonkey.Monkey);
    }
    return modules;
  }

  async load() {
    const app = this.app;
    // 1. import
    const promises: Promise<IModuleResource>[] = [];
    for (const module of app.meta.modulesArray) {
      promises.push(import(this._getModuleIndexPath(module)));
    }
    const timeBegin = new Date();
    console.log(`import modules begin, pid: ${process.pid}`);
    const modulesResource = await Promise.all(promises);
    const timeEnd = new Date();
    console.log(`import modules end, pid: ${process.pid}: ${(timeEnd.valueOf() - timeBegin.valueOf()) / 1000}s`);
    for (let i = 0; i < modulesResource.length; i++) {
      const module = app.meta.modulesArray[i];
      module.resource = modulesResource[i];
    }
    // 2. main / monkey
    for (const module of app.meta.modulesArray) {
      if (module.resource.Main) {
        module.mainInstance = app.bean._newBean(module.resource.Main);
      }
      if (module.resource.Monkey) {
        module.monkeyInstance = app.bean._newBean(module.resource.Monkey);
        app.meta.modulesMonkey[module.info.relativeName] = module;
      }
    }
    // extra: check if empty modules
    this.__checkEmptyModules();
  }

  async monkey(monkeyName) {
    const app = this.app;
    for (const module of app.meta.modulesArray) {
      await app.meta.util.monkeyModule(app.meta.appMonkey, app.meta.modulesMonkey, monkeyName, [module]);
    }
  }

  private _getModuleIndexPath(module): string {
    const app = this.app;
    const pathSrc = `${module.root}/src/index.ts`;
    if ((app.meta.isTest || app.meta.isLocal) && fse.existsSync(pathSrc)) {
      return pathSrc;
    }
    return `${module.root}/dist/index.js`;
  }

  private __checkEmptyModules() {
    console.log('------------------- empty:');
    for (const module of this.app.meta.modulesArray) {
      if (!this.__checkEmptyModule(module)) continue;
      console.log(module.info.relativeName);
    }
  }

  private __checkEmptyModule(module: IModule) {
    function __checkEmptyObject(obj) {
      return Object.keys(obj).length === 0;
    }
    const resource = module.resource;
    if (resource.routes.length > 0) return false;
    if (!__checkEmptyObject(resource.Errors)) return false;
    if (!__checkEmptyObject(resource.locales['en-us'])) return false;
    if (!__checkEmptyObject(resource.locales['zh-cn'])) return false;
    if (!__checkEmptyObject(resource.config(this.app))) return false;
    if (resource.constants) return false;
    if (resource.Monkey) return false;
    if (resource.Main) return false;
    // console.log('----suite:', module.suite);
    if (['bz-diancai', 'cabloy-store', 'bz-study'].includes(module.suite || '')) return false;
    // console.log(module.info.relativeName);
    console.log(`${module.info.originalName}/src/index.ts`);
    console.log(module.resource);
    return true;
  }
}
