import Module from 'module';
import ModuleInfo from '@cabloy/module-info';
import MetaFn from './meta.js';

let __patched = false;
export default function (app) {
  // only once
  if (__patched) return;
  __patched = true;

  // meta
  const meta = MetaFn(app);

  // compile
  const Module2 = Module as any;
  const originalCompile = Module2.prototype._compile;
  Module2.prototype._compile = function (this: any, ...args) {
    const _module = this;
    let _moduleInfo;
    // meta
    Object.defineProperty(_module, 'meta', {
      enumerable: false,
      get() {
        return meta;
      },
    });
    // info
    Object.defineProperty(_module, 'info', {
      enumerable: false,
      get() {
        if (!_moduleInfo) {
          _moduleInfo = ModuleInfo.parseInfoFromPackage(_module.path);
        }
        return _moduleInfo;
      },
    });
    return originalCompile.apply(_module, args);
  };
}
