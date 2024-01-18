import { TypeLocalRecord } from '../../../index.js';
import { BeanScopeBase } from './beanScopeBase.js';

export class BeanLocal extends BeanScopeBase {
  // magic
  protected __get__(prop) {
    const bean = this.ctx ? this.ctx.bean : this.app.bean;
    return bean._getBean(`${this.moduleScope}.local.${prop}`);
  }
}

export type BeanLocalLike = TypeLocalRecord & BeanLocal;
