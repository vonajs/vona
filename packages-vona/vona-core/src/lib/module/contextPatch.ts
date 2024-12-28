import { VonaApplication } from '../../types/index.js';

export default function (app: VonaApplication) {
  // patch context
  patchCreateContext();

  function patchCreateContext() {
    const createContext = app.createContext as any;
    app.createContext = (...args) => {
      const context = createContext.call(app, ...args);
      app.util.monkeyModule(app.meta.appMonkey, app.meta.modulesArray, 'createContext', undefined, context);
      return context;
    };
  }
}
