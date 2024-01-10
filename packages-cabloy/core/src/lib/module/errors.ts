import extend from '@zhennann/extend';
import assetErrors from './asset/errors.js';
import { ErrorClass } from '../base/error.js';
import { CabloyContext } from '../../types/index.js';
const ERROR = Symbol('Context#__error');

export default function (loader, modules) {
  // all errors
  const ebErrors = {};

  // load errors
  loadErrors();

  // patch service
  patchCreateContext();

  function patchCreateContext() {
    const createContext = loader.app.createContext;
    loader.app.createContext = (...args) => {
      const context: CabloyContext = createContext.call(loader.app, ...args);

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
        return loader.app.meta.util.createError(data);
      };

      return context;
    };
  }

  function loadErrors() {
    Object.keys(modules).forEach(key => {
      const module = modules[key];
      const ebError = (ebErrors[module.info.relativeName] = {});

      // module errors
      if (module.main.errors) extend(true, ebError, module.main.errors);

      // asset errors
      extend(true, ebError, assetErrors);
    });
  }
}
