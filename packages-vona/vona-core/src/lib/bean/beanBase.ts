import type { ILoggerClientChildRecord } from '../../types/interface/logger.ts';
import type { IModuleLocaleText } from './resource/locale/type.ts';
import type { IBeanScopeContainer } from './scope/beanScopeContainer.ts';
import type { IBeanScopeRecord, TypeBeanScopeRecordKeys } from './type.ts';
import { BeanBaseSimple, SymbolModuleBelong } from './beanBaseSimple.ts';

const SymbolText = Symbol('SymbolText');

export class BeanBase extends BeanBaseSimple {
  protected get $text(): IModuleLocaleText {
    if (!this[SymbolText]) {
      this[SymbolText] = this.app.meta.locale.createLocaleText(this[SymbolModuleBelong]);
    }
    return this[SymbolText];
  }

  protected get $logger() {
    return this.app.meta.logger.get();
  }

  protected $loggerChild(childName: keyof ILoggerClientChildRecord) {
    return this.app.meta.logger.child(childName);
  }

  protected get $scope(): IBeanScopeContainer {
    return this.app.meta.scopeContainer as unknown as IBeanScopeContainer;
  }

  public get scope(): unknown {
    return this.getScope();
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
