import { appResource } from '../core/resource.js';
import { BeanSimple } from './beanSimple.js';

export class BeanBase<T = unknown> extends BeanSimple {
  private __beanFullName__: string;
  private __moduleBelong__: string;

  constructor(moduleBelong: string) {
    super();
    this.__moduleBelong__ = moduleBelong;
  }

  protected get moduleBelong() {
    return this.__moduleBelong__ || appResource._getModuleBelong(this.__beanFullName__);
  }

  get scope() {
    return this.getScope() as T;
  }

  getScope() {
    return this.bean.scope(this.moduleBelong) as T;
  }
}
