import { appResource } from '../core/resource.js';
import { BeanSimple } from './beanSimple.js';
import { IBeanScopeRecord, TypeBeanScopeRecordKeys } from './type.js';

export class BeanBase<TScopeModule = unknown> extends BeanSimple {
  private __beanFullName__: string;
  private __moduleBelong__?: string;

  constructor(moduleBelong?: string) {
    super();
    if (moduleBelong && typeof moduleBelong !== 'string') {
      throw new Error(`moduleBelong not valid: ${moduleBelong}`);
    }
    this.__moduleBelong__ = moduleBelong;
  }

  protected get moduleBelong() {
    return this.__moduleBelong__ || appResource._getModuleBelong(this.__beanFullName__);
  }

  protected get scope() {
    return this.getScope() as TScopeModule;
  }

  protected getScope<K extends TypeBeanScopeRecordKeys>(moduleScope: K): IBeanScopeRecord[K];
  protected getScope<T>(moduleScope: string): T;
  protected getScope(): TScopeModule;
  protected getScope(moduleScope?: string) {
    if (!moduleScope) {
      return this.bean.scope(this.moduleBelong) as TScopeModule;
    }
    return this.bean.scope(moduleScope);
  }
}
