import { BeanBaseSimple } from './beanBaseSimple.js';
import { IModuleLocaleText } from './resource/locale/type.js';
import { BeanScopeContainer } from './scope/beanScopeContainer.js';

const SymbolText = Symbol('SymbolText');

export class BeanBase<TScopeModule = unknown> extends BeanBaseSimple {
  protected get $text(): IModuleLocaleText {
    if (!this[SymbolText]) {
      this[SymbolText] = this.ctx.meta.locale.createLocaleText(this.moduleBelong);
    }
    return this[SymbolText];
  }

  protected get scope(): TScopeModule {
    return this.bean.scope(this.moduleBelong as never) as TScopeModule;
  }

  protected get $scope(): BeanScopeContainer {
    return this.bean._getBean(BeanScopeContainer);
  }
}
