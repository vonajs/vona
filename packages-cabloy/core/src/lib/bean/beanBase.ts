import { appResource } from '../../core/resource.js';
import { BeanSimple } from '../index.js';

export class BeanBase extends BeanSimple {
  protected get bean() {
    return this.ctx.bean;
  }

  protected get moduleBelong() {
    return appResource._getModuleBelong(this.constructor as any);
  }
}
