import { BeanBaseSimple } from './beanBaseSimple.js';
import { IModuleLocaleText } from './resource/locale/type.js';
import { IBeanScopeContainer } from './scope/beanScopeContainer.js';
import { IBeanScopeRecord, TypeBeanScopeRecordKeys } from './type.js';

const SymbolText = Symbol('SymbolText');

export class BeanBase<TScopeModule = unknown> extends BeanBaseSimple {
  protected get $text(): IModuleLocaleText {
    if (!this[SymbolText]) {
      this[SymbolText] = this.app.meta.locale.createLocaleText(this.moduleBelong);
    }
    return this[SymbolText];
  }

  protected get $appUtil() {
    return this.app.meta.util;
  }

  protected get $ctxUtil() {
    return this.ctx.meta.util;
  }

  public get scope(): TScopeModule {
    return this.getScope() as TScopeModule;
  }

  protected get $scope(): IBeanScopeContainer {
    return this.app.meta.scopeContainer as unknown as IBeanScopeContainer;
  }

  protected getScope<K extends TypeBeanScopeRecordKeys>(moduleScope: K): IBeanScopeRecord[K];
  // protected getScope<T>(moduleScope: string): T;
  protected getScope(): TScopeModule;
  protected getScope(moduleScope?: string) {
    if (!moduleScope) {
      return this.bean.scope(this.moduleBelong as never) as TScopeModule;
    }
    return this.bean.scope(moduleScope as never);
  }
}
