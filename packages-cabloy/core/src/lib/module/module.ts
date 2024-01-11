import fse from 'fs-extra';
import path from 'path';
import is from 'is-type-of';
import mglob from 'egg-born-mglob';
import { CabloyApplication } from '../../types/index.js';

export default function (app: CabloyApplication) {
  // all modules
  const { suites, modules, modulesArray, modulesMonkey } = mglob.glob({
    projectPath: path.join(app.options.baseDir, '../..'),
    disabledModules: app.config.disabledModules,
    disabledSuites: app.config.disabledSuites,
    log: !!app.meta.inAgent,
    type: 'backend',
  });
  // eslint-disable-next-line
  const ebSuites = (app.meta.suites = suites);
  const ebModules = (app.meta.modules = modules);
  const ebModulesArray = (app.meta.modulesArray = modulesArray);
  const ebModulesMonkey = (app.meta.modulesMonkey = modulesMonkey);

  // app monkey
  const pathAppMonkey = path.resolve(app.options.baseDir, 'config/monkey.js');
  let ebAppMonkey;
  if (fse.existsSync(pathAppMonkey)) {
    const AppMonkey = require(pathAppMonkey);
    ebAppMonkey = app.meta.appMonkey = app.bean._newBean(AppMonkey);
  }

  return {
    async loadModules() {
      // 1. require
      for (const module of ebModulesArray) {
        module.main = require(module.js.backend);
      }
      // 2. load
      for (const module of ebModulesArray) {
        if (is.class(module.main)) {
          const mainInstance = app.bean._newBean(module.main);
          module.main = (<any>mainInstance).options;
          module.mainInstance = mainInstance;
        } else if (is.function(module.main) && !is.class(module.main)) {
          module.main = module.main(app, module);
        }
      }
      // 3. monkey
      for (const key in ebModulesMonkey) {
        const moduleMonkey = ebModulesMonkey[key];
        if (moduleMonkey.main.monkey) {
          moduleMonkey.monkeyInstance = app.bean._newBean(moduleMonkey.main.monkey);
        }
      }
      // ok
      return ebModules;
    },
    async monkeyModules(monkeyName) {
      for (const module of ebModulesArray) {
        app.meta.util.monkeyModule(ebAppMonkey, ebModulesMonkey, monkeyName, { module });
      }
    },
  };
}
