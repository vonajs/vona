import { appResource } from '../../core/resource.js';
import { BeanSimple } from '../index.js';

export class BeanBase extends BeanSimple {
  get bean() {
    return this.ctx.bean;
  }

  get moduleBelong() {
    const beanOptions = appResource.getBean(this.constructor as any);
    if (!beanOptions || !beanOptions.moduleBelong) throw new Error(`not found module belong: ${this.constructor.name}`);
    return beanOptions.moduleBelong;
  }
}
