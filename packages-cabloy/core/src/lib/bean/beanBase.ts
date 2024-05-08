import { BeanBaseSimple } from './beanBaseSimple.js';
import { IBeanScopeRecord, TypeBeanScopeRecordKeys } from './type.js';

export class BeanBase<TScopeModule = unknown> extends BeanBaseSimple {
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
