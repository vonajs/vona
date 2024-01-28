import { appResource } from '../core/resource.js';
import { BeanSimple } from './beanSimple.js';

export class BeanBase<T = unknown> extends BeanSimple {
  private __beanFullName__: string;

  protected get moduleBelong() {
    return appResource._getModuleBelong(this.__beanFullName__);
  }

  get scope() {
    return this.getScope() as T;
  }

  getScope() {
    return this.bean.scope(this.moduleBelong) as T;
  }
}
