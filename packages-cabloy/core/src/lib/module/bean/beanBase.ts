import { BeanSimple } from '../index.js';

export class BeanBase extends BeanSimple {
  get bean() {
    return this.ctx.bean;
  }
}
