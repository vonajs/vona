import { appResource } from '../core/resource.js';
import { BeanSimple } from './beanSimple.js';

export class BeanBase extends BeanSimple {
  private __beanFullName__: string;

  protected get moduleBelong() {
    return appResource._getModuleBelong(this.__beanFullName__);
  }

  getScope() {
    return this.bean.scope(this.moduleBelong);
  }
}
