import { CabloyApplication } from '../../type/index.js';
import { Model } from '../base/model.js';

export default function (app: CabloyApplication) {
  // patch model
  patchCreateContext();

  function patchCreateContext() {
    const createContext = app.createContext as any;
    app.createContext = (...args) => {
      const context = createContext.call(app, ...args);

      // maybe /favicon.ico
      if (context.module) {
        context.model = createModelContainer(context, context.module.info.relativeName);
      }

      return context;
    };
  }

  function createModelContainer(context, relativeName) {
    // base
    const modelContainer = context.bean._newBean(Model, { table: null });
    // remove app/config/service
    modelContainer.app = undefined;
    modelContainer.config = undefined;
    modelContainer.service = undefined;
    // module
    modelContainer.__ebCacheModule = new Map();
    modelContainer.module = function (moduleName) {
      let _modelContainer = modelContainer.__ebCacheModule.get(moduleName);
      if (!_modelContainer) {
        _modelContainer = createModelContainer(context, moduleName);
        modelContainer.__ebCacheModule.set(moduleName, _modelContainer);
      }
      return _modelContainer;
    };
    // proxy
    return new Proxy(modelContainer, {
      get(obj, prop) {
        if (typeof prop === 'symbol') return obj[prop];
        // base
        if (obj[prop]) return obj[prop];
        const beanFullName = `${relativeName}.model.${prop}`;
        // model
        return context.bean._getBean(beanFullName);
      },
    });
  }
}
