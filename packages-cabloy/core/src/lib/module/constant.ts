import { extend } from '@cabloy/extend';
import { CabloyApplication, IModule } from '../../types/index.js';

export default function (app: CabloyApplication, modules: Record<string, IModule>) {
  // all constants
  const ebConstants = (app.meta.constants = {});

  // load constants
  loadConstants();

  // patch service
  patchCreateContext();

  function patchCreateContext() {
    const createContext = app.createContext as any;
    app.createContext = (...args) => {
      const context = createContext.call(app, ...args);

      // maybe /favicon.ico
      if (context.module) {
        // constant
        context.constant = ebConstants[context.module.info.relativeName];
      }

      return context;
    };
  }

  function loadConstants() {
    for (const key in modules) {
      const module = modules[key];
      const ebConstant = (ebConstants[module.info.relativeName] = {});

      // module constants
      if (module.resource.constants) extend(true, ebConstant, module.resource.constants);

      // patchConstant
      patchConstant(ebConstant);
    }
  }

  function patchConstant(ebConstant) {
    Object.defineProperty(ebConstant, 'module', {
      enumerable: false,
      get() {
        return function (moduleName) {
          return ebConstants[moduleName];
        };
      },
    });
  }
}
