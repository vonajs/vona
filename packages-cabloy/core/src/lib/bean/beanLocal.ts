import { BeanModuleScopeBase } from './beanModuleScopeBase.js';

export class BeanLocal extends BeanModuleScopeBase {
  // magic
  protected __get__(prop) {
    return this.bean._getBean(`${this.moduleScope}.local.${prop}`);
  }
}
