import { TypeLocalRecord } from '../../../index.js';
import { BeanModuleScopeBase } from './beanModuleScopeBase.js';

export class BeanLocal extends BeanModuleScopeBase {
  // magic
  protected __get__(prop) {
    const bean = this.ctx ? this.ctx.bean : this.app.bean;
    return bean._getBean(`${this.moduleScope}.local.${prop}`);
  }
}

export type BeanLocalLike = TypeLocalRecord & BeanLocal;
