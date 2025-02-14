import { BeanBaseSimple, SymbolModuleBelong } from './beanBaseSimple.js';
import type { IModuleLocaleText } from './resource/locale/type.js';
import type { IBeanScopeContainer } from './scope/beanScopeContainer.js';
import type { IBeanScopeRecord, TypeBeanScopeRecordKeys } from './type.js';

const SymbolText = Symbol('SymbolText');

export class BeanBase extends BeanBaseSimple {
  protected get $text(): IModuleLocaleText {
    if (!this[SymbolText]) {
      this[SymbolText] = this.app.meta.locale.createLocaleText(this[SymbolModuleBelong]);
    }
    return this[SymbolText];
  }

  public get scope(): unknown {
    return this.getScope();
  }

  protected get $scope(): IBeanScopeContainer {
    return this.app.meta.scopeContainer as unknown as IBeanScopeContainer;
  }

  protected getScope<K extends TypeBeanScopeRecordKeys>(moduleScope: K): IBeanScopeRecord[K];
  // protected getScope<T>(moduleScope: string): T;
  protected getScope(): unknown;
  protected getScope(moduleScope?: string) {
    if (!moduleScope) {
      return this.bean.scope(this[SymbolModuleBelong] as never);
    }
    return this.bean.scope(moduleScope as never);
  }
}
