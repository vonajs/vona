import extend from '@cabloy/extend';
import assetErrors from './asset/errors.js';
import { ErrorClass } from '../error/errorClass.js';
import { CabloyApplication, IModule } from '../../types/index.js';
const ERROR = Symbol('Context#__error');

export default function (app: CabloyApplication, modules: Record<string, IModule>) {
  // all errors
  const ebErrors = {};

  // load errors
  loadErrors();

  // patch service
  patchCreateContext();

  function patchCreateContext() {
    const createContext = app.createContext as any;
    app.createContext = (...args) => {
      const context = createContext.call(app, ...args);

      // maybe /favicon.ico
      if (context.module) {
        // error
        (<any>context)[ERROR] = context.bean._newBean(ErrorClass, ebErrors);

        // methods
        ['success', 'fail', 'throw', 'parseFail', 'parseSuccess', 'parseCode'].forEach(key => {
          context[key] = function (...args) {
            return (<any>context)[ERROR][key](context.module.info.relativeName, ...args);
          };
          context[key].module = function (module, ...args) {
            return (<any>context)[ERROR][key](module, ...args);
          };
        });
      }

      // createError
      context.createError = function (data) {
        return app.meta.util.createError(data);
      };

      return context;
    };
  }

  function loadErrors() {
    for (const key in modules) {
      const module = modules[key];
      const ebError = (ebErrors[module.info.relativeName] = {});

      // module errors
      if (module.resource.Errors) extend(true, ebError, module.resource.Errors);

      // asset errors
      extend(true, ebError, assetErrors);
    }
  }
}
