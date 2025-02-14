import fse from 'fs-extra';
import path from 'path';
import { glob } from '@cabloy/module-glob';
import type { IModuleResource } from '../../types/index.js';
import { BeanSimple } from '../bean/beanSimple.js';
import { pathToFileURL } from 'node:url';
import * as Path from 'node:path';
import type { IModule } from '@cabloy/module-info';

// const __import_type_serialization = true;
const __import_type_serialization = false;

export class ModuleTools extends BeanSimple {
  async prepare(): Promise<Record<string, IModule>> {
    const app = this.app;
    // all modules
    const { suites, modules, modulesArray } = await glob({
      projectMode: 'vona',
      projectPath: path.join(app.options.baseDir, '../..'),
      disabledModules: process.env.PROJECT_DISABLED_MODULES,
      disabledSuites: process.env.PROJECT_DISABLED_SUITES,
      log: false,
      // log: !!app.meta.inAgent,
      meta: app.meta,
    });
    app.meta.suites = suites;
    app.meta.modules = modules;
    app.meta.modulesArray = modulesArray;
    app.meta.modulesMonkey = {};
    // app monkey
    let pathAppMonkey;
    if (app.meta.isTest || app.meta.isLocal) {
      pathAppMonkey = _pathToHref(path.resolve(process.cwd(), 'src/backend/config/monkey.mts'));
    } else {
      pathAppMonkey = _pathToHref(path.resolve(app.options.baseDir, 'config/monkey.mjs'));
    }
    if (fse.existsSync(pathAppMonkey)) {
      const AppMonkey = await import(pathAppMonkey);
      app.meta.appMonkey = app.bean._newBean(AppMonkey.AppMonkey);
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
        module.mainInstance = app.bean._newBean(module.resource.Main, module);
      }
      if (module.resource.Monkey) {
        module.monkeyInstance = app.bean._newBean(module.resource.Monkey, module);
        app.meta.modulesMonkey[module.info.relativeName] = module;
      }
    }
  }

  async monkey(monkeyName) {
    const app = this.app;
    for (const module of app.meta.modulesArray) {
      await app.util.monkeyModule(app.meta.appMonkey, app.meta.modulesMonkey, monkeyName, module);
    }
  }

  private _getModuleIndexPath(module): string {
    const app = this.app;
    const pathSrc = `${module.root}/src/index.ts`;
    if ((app.meta.isTest || app.meta.isLocal) && fse.existsSync(pathSrc)) {
      return _pathToHref(pathSrc);
    }
    return _pathToHref(`${module.root}/dist/index.js`);
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

  private async _importModules_preload() {
    for (const module of this.app.meta.modulesArray) {
      if (module.info.capabilities?.preload) {
        await import(this._getModuleIndexPath(module));
      }
    }
  }

  protected async _importSpecificModule(moduleName: string) {
    const module = this.app.meta.modules[moduleName];
    await import(this._getModuleIndexPath(module));
  }

  private async _importModules() {
    const timeBegin = new Date();
    // eslint-disable-next-line
    console.log(`import modules begin, pid: ${process.pid}`);
    // preload
    await this._importModules_preload();
    // import
    let modulesResource: IModuleResource[];
    if (__import_type_serialization) {
      modulesResource = await this._importModules_serialization();
    } else {
      modulesResource = await this._importModules_parallelization();
    }
    const timeEnd = new Date();
    // eslint-disable-next-line
    console.log(`import modules end, pid: ${process.pid}: ${(timeEnd.valueOf() - timeBegin.valueOf()) / 1000}s`);
    return modulesResource;
  }
}

function _pathToHref(fileName: string): string {
  return Path.sep === '\\' ? pathToFileURL(fileName).href : fileName;
}
