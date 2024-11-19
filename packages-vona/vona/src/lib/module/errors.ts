import { extend } from '@cabloy/extend';
import { ErrorClass } from '../bean/resource/error/errorClass.js';
import { VonaApplication, IModule } from '../../types/index.js';
const SymbolError = Symbol('Application#SymbolError');

export default function (app: VonaApplication, modules: Record<string, IModule>) {
  // all errors
  const ebErrors = {};

  // load errors
  loadErrors();

  // patch Error
  patchError();

  function patchError() {
    // error
    app[SymbolError] = app.bean._newBean(ErrorClass, ebErrors);

    // methods
    ['success', 'fail', 'throw', 'parseFail', 'parseSuccess', 'parseCode'].forEach(key => {
      app[key] = function (...args) {
        return (<any>app)[SymbolError][key](app.ctx.module.info.relativeName, ...args);
      };
      app[key].module = function (module, ...args) {
        return (<any>app)[SymbolError][key](module, ...args);
      };
    });
  }

  function loadErrors() {
    for (const key in modules) {
      const module = modules[key];
      const ebError = (ebErrors[module.info.relativeName] = {});

      // module errors
      if (module.resource.Errors) extend(true, ebError, module.resource.Errors);
    }
  }
}
