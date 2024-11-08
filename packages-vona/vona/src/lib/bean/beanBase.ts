import { BeanBaseSimple } from './beanBaseSimple.js';
import { IModuleLocaleText } from './resource/locale/type.js';
import { BeanScopeContainer, IBeanScopeContainer } from './scope/beanScopeContainer.js';
import { IBeanScopeRecord, TypeBeanScopeRecordKeys } from './type.js';

const SymbolText = Symbol('SymbolText');
const SymbolScopeContainer = Symbol('BeanBase#SymbolScopeContainer');

export class BeanBase<TScopeModule = unknown> extends BeanBaseSimple {
  private [SymbolScopeContainer]: IBeanScopeContainer;

  protected get $text(): IModuleLocaleText {
    if (!this[SymbolText]) {
      this[SymbolText] = this.ctx.meta.locale.createLocaleText(this.moduleBelong);
    }
    return this[SymbolText];
  }

  protected get $appUtil() {
    return this.app.meta.util;
  }

  protected get $ctxUtil() {
    return this.ctx.meta.util;
  }

  protected get scope(): TScopeModule {
    return this.getScope() as TScopeModule;
  }

  protected get $scope(): IBeanScopeContainer {
    if (!this[SymbolScopeContainer]) {
      this[SymbolScopeContainer] = this.bean._newBean(BeanScopeContainer) as unknown as IBeanScopeContainer;
    }
    return this[SymbolScopeContainer];
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
