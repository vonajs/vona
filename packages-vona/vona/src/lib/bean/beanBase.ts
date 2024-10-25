import { BeanBaseSimple } from './beanBaseSimple.js';
import { IModuleLocaleText } from './resource/locale/type.js';
import { IBeanScopeRecord, TypeBeanScopeRecordKeys } from './type.js';

const SymbolText = Symbol('SymbolText');

export class BeanBase<TScopeModule = unknown> extends BeanBaseSimple {
  protected get $text(): IModuleLocaleText {
    if (!this[SymbolText]) {
      this[SymbolText] = this.ctx.meta.locale.createLocaleText(this.moduleBelong);
    }
    return this[SymbolText];
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

  // protected __get__(prop) {
  //   console.log(prop);
  // }
}
