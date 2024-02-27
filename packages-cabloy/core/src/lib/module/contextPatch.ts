import { CabloyApplication, IModule } from '../../types/index.js';

export default function (app: CabloyApplication) {
  // all constants
  const ebModules: IModule[] = [];

  // load modules
  loadModules();

  // patch context
  patchCreateContext();

  function patchCreateContext() {
    const createContext = app.createContext as any;
    app.createContext = (...args) => {
      const context = createContext.call(app, ...args);

      for (const module of ebModules) {
        module.mainInstance.createContext(context);
      }

      return context;
    };
  }

  function loadModules() {
    for (const module of app.meta.modulesArray) {
      if (module.mainInstance && !!module.mainInstance.createContext) {
        ebModules.push(module);
      }
    }
  }
}
