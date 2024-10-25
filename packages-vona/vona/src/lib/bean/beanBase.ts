import { splitWords } from '@cabloy/word-utils';
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
  // protected getScope<T>(moduleScope: string): T;
  protected getScope(): TScopeModule;
  protected getScope(moduleScope?: string) {
    if (!moduleScope) {
      return this.bean.scope(this.moduleBelong) as TScopeModule;
    }
    return this.bean.scope(moduleScope);
  }

  protected __get__(prop: PropertyKey) {
    if (typeof prop === 'string' && prop.startsWith('$scope')) {
      let moduleName = splitWords(prop.substring('$scope'.length), true, '-');
      if (!moduleName?.includes('-')) {
        moduleName = 'a-' + moduleName;
      }
      return this.getScope(moduleName as never);
    }
  }
}
