import type winston from 'winston';
import type { ILoggerClientChildRecord } from '../../types/interface/logger.ts';
import type { IModuleLocaleText } from './resource/locale/type.ts';
import type { IBeanScopeContainer } from './scope/beanScopeContainer.ts';
import type { IBeanScopeRecord, TypeBeanScopeRecordKeys } from './type.ts';
import { BeanBaseSimple, SymbolModuleBelong } from './beanBaseSimple.ts';

const SymbolText = Symbol('SymbolText');
const SymbolLogger = Symbol('SymbolLogger');
const SymbolLoggerChildren = Symbol('SymbolLoggerChildren');

export class BeanBase extends BeanBaseSimple {
  private [SymbolText]: IModuleLocaleText;
  private [SymbolLogger]: winston.Logger;
  private [SymbolLoggerChildren]: Record<string, winston.Logger> = {};

  protected get $text(): IModuleLocaleText {
    if (!this[SymbolText]) {
      this[SymbolText] = this.app.meta.locale.createLocaleText(this[SymbolModuleBelong]);
    }
    return this[SymbolText];
  }

  protected get $logger() {
    if (!this[SymbolLogger]) {
      this[SymbolLogger] = this.app.meta.logger.get().child({ beanFullName: this.beanFullName });
    }
    return this[SymbolLogger];
  }

  protected $loggerChild(childName: keyof ILoggerClientChildRecord) {
    if (!this[SymbolLoggerChildren][childName]) {
      this[SymbolLoggerChildren][childName] = this.$logger.child(childName);
    }
    return this[SymbolLoggerChildren][childName];
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
