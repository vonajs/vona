import { appResource } from '../core/resource.js';
import { IDecoratorBeanOptionsBase } from '../decorator/interface/beanOptions.js';
import { BeanSimple } from './beanSimple.js';

export const SymbolBeanFullName = Symbol('SymbolBeanFullName');
export const SymbolModuleBelong = Symbol('SymbolModuleBelong');
export const SymbolModuleName = Symbol('SymbolModuleName');

export class BeanBaseSimple extends BeanSimple {
  private [SymbolBeanFullName]: string;

  protected get [SymbolModuleBelong]() {
    return appResource._getModuleBelong(this[SymbolBeanFullName]);
  }

  protected get [SymbolModuleName]() {
    return appResource._getModuleName(this[SymbolBeanFullName]);
  }

  protected get beanFullName() {
    return this[SymbolBeanFullName];
  }

  protected get beanOptions(): IDecoratorBeanOptionsBase {
    return appResource.getBean(this[SymbolBeanFullName])!;
  }

  protected get onionName() {
    const parts = this.beanFullName.split('.');
    return `${parts[0]}:${parts[2]}`;
  }

  protected get onionOptions(): unknown | undefined {
    return this.beanOptions.options;
  }
}
