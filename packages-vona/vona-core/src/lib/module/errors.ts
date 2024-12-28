import { ErrorClass } from '../bean/resource/error/errorClass.js';
import { VonaApplication, IModule } from '../../types/index.js';
import { deepExtend } from '../utils/util.js';

export default function (app: VonaApplication, modules: Record<string, IModule>) {
  // all errors
  const ebErrors = {};

  // load errors
  loadErrors();

  // patch Error
  patchError();

  function patchError() {
    // error
    app.meta.error = app.bean._newBean(ErrorClass, ebErrors);

    // methods
    ['success', 'fail', 'throw', 'parseFail', 'parseSuccess', 'parseCode'].forEach(key => {
      app[key] = function (...args) {
        return app.meta.error[key](undefined, ...args);
      };
    });

    // todo: maybe need not
    app['successMore'] = function (list, index, size) {
      app.success({
        list,
        index: index + list.length,
        finished: size === -1 || size === 0 || list.length < size,
      });
    };
  }

  function loadErrors() {
    for (const key in modules) {
      const module = modules[key];
      const ebError = (ebErrors[module.info.relativeName] = {});

      // module errors
      if (module.resource.Errors) deepExtend(ebError, module.resource.Errors);
    }
  }
}
