import fse from 'fs-extra';
import path from 'path';
import { glob } from '@cabloy/module-glob';
import { IModule, IModuleResource } from '../../types/index.js';
import { BeanSimple } from '../bean/beanSimple.js';

// const __import_type_serialization = true;
const __import_type_serialization = false;

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
    const modulesResource = await this._importModules();
    // 2. resource
    for (let i = 0; i < modulesResource.length; i++) {
      const module = app.meta.modulesArray[i];
      module.resource = modulesResource[i];
    }
    // 3. main / monkey
    for (const module of app.meta.modulesArray) {
      if (module.resource.Main) {
        module.mainInstance = app.bean._newBean(module.resource.Main);
      }
      if (module.resource.Monkey) {
        module.monkeyInstance = app.bean._newBean(module.resource.Monkey);
        app.meta.modulesMonkey[module.info.relativeName] = module;
      }
    }
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

  private async _importModules_serialization() {
    const modulesResource: IModuleResource[] = [];
    for (const module of this.app.meta.modulesArray) {
      modulesResource.push(await import(this._getModuleIndexPath(module)));
    }
    return modulesResource;
  }

  private async _importModules_parallelization() {
    const promises: Promise<IModuleResource>[] = [];
    for (const module of this.app.meta.modulesArray) {
      promises.push(import(this._getModuleIndexPath(module)));
    }
    return await Promise.all(promises);
  }

  private async _importModules() {
    const timeBegin = new Date();
    console.log(`import modules begin, pid: ${process.pid}`);
    let modulesResource: IModuleResource[];
    if (__import_type_serialization) {
      modulesResource = await this._importModules_serialization();
    } else {
      modulesResource = await this._importModules_parallelization();
    }
    const timeEnd = new Date();
    console.log(`import modules end, pid: ${process.pid}: ${(timeEnd.valueOf() - timeBegin.valueOf()) / 1000}s`);
    return modulesResource;
  }
}
