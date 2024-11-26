import { VonaApplication, IModule } from '../../types/index.js';
import { deepExtend } from '../utils/util.js';

export default function (app: VonaApplication, modules: Record<string, IModule>) {
  // all constants
  const ebConstants = (app.meta.constants = {});

  // load constants
  loadConstants();

  function loadConstants() {
    for (const key in modules) {
      const module = modules[key];
      const ebConstant = (ebConstants[module.info.relativeName] = {});

      // module constants
      if (module.resource.constants) deepExtend(ebConstant, module.resource.constants);

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
