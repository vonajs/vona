import extend from '@cabloy/extend';
import { CabloyApplication } from '../../types/index.js';

const CTXCONFIG = Symbol.for('Context#__config');

export default async function (app: CabloyApplication, modules) {
  // all configs
  app.meta.configs = {};

  // load configs
  await loadConfigs();

  // patch service
  patchCreateContext();

  function patchCreateContext() {
    const createContext = app.createContext as any;
    app.createContext = (...args) => {
      const context = createContext.call(app, ...args);

      // maybe /favicon.ico
      if (context.module) {
        Object.defineProperty(context, 'config', {
          enumerable: false,
          get() {
            // check cache
            if (context[CTXCONFIG]) return context[CTXCONFIG];
            // get
            let useCache;
            let _configs = context.bean.instance.getInstanceConfigs();
            if (!_configs) {
              _configs = app.meta.configs;
              useCache = false;
            } else {
              useCache = true;
            }
            const _config = _configs[context.module.info.relativeName];
            _config.module = function (moduleName) {
              return _configs[moduleName];
            };
            if (useCache) {
              context[CTXCONFIG] = _config;
            }
            return _config;
          },
        });
      }

      return context;
    };
  }

  async function loadConfigs() {
    for (const key in modules) {
      const module = modules[key];
      const ebConfig = (app.meta.configs[module.info.relativeName] = {});

      // module config
      if (module.resource.config) {
        const config = module.resource.config(app);
        // configNew is not used by now
        await app.meta.util.monkeyModule(app.meta.appMonkey, app.meta.modulesMonkey, 'configLoaded', {
          module,
          config,
        });
        extend(true, ebConfig, config);
      }

      // application config
      if (app.config.modules && app.config.modules[module.info.relativeName]) {
        extend(true, ebConfig, app.config.modules[module.info.relativeName]);
      }
    }
  }
}
