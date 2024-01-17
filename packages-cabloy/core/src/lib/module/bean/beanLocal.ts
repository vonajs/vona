import { TypeLocalRecord } from '../../../index.js';
import { BeanModuleBase } from './beanModuleBase.js';

export class BeanLocal extends BeanModuleBase {
  // magic
  __get__(prop) {
    const bean = this.ctx ? this.ctx.bean : this.app.bean;
    return bean._getBean(`${this.moduleScope}.local.${prop}`);
  }
}

export type BeanLocalLike = TypeLocalRecord & BeanLocal;
