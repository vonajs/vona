import fse from 'fs-extra';
import path from 'path';
import { glob } from '@cabloy/module-glob';
import { IModule, IModuleResource } from '../../types/index.js';
import { BeanSimple } from '../bean/beanSimple.js';

export class ModuleTools extends BeanSimple {
  async prepare(): Promise<Record<string, IModule>> {
    const app = this.app;
    // all modules
    const { suites, modules, modulesArray, modulesMonkey } = await glob({
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
    app.meta.modulesMonkey = modulesMonkey;
    // app monkey
    const pathAppMonkey = path.resolve(app.options.baseDir, 'config/monkey.js');
    if (fse.existsSync(pathAppMonkey)) {
      const AppMonkey = require(pathAppMonkey);
      app.meta.appMonkey = app.bean._newBean(AppMonkey);
    }
    return modules;
  }

  async load() {
    const app = this.app;
    // 1. import
    const promises: Promise<IModuleResource>[] = [];
    for (const module of app.meta.modulesArray) {
      const subPath = app.meta.isTest || app.meta.isLocal ? 'src' : 'dist';
      promises.push(import(`${module.root}/${subPath}/index.js`));
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
    // 2. main
    for (const module of app.meta.modulesArray) {
      if (module.resource.Main) {
        module.mainInstance = app.bean._newBean(module.resource.Main);
      }
    }
    // 3. monkey
    for (const key in app.meta.modulesMonkey) {
      const moduleMonkey = app.meta.modulesMonkey[key];
      if (moduleMonkey.resource.Monkey) {
        moduleMonkey.monkeyInstance = app.bean._newBean(moduleMonkey.resource.Monkey);
      }
    }
  }

  async monkey(monkeyName) {
    const app = this.app;
    for (const module of app.meta.modulesArray) {
      await app.meta.util.monkeyModule(app.meta.appMonkey, app.meta.modulesMonkey, monkeyName, [module]);
    }
  }
}
