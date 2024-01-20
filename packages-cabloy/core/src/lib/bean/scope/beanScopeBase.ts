import { BeanScopeScene } from './beanScopeScene.js';
import { BeanBase } from '../beanBase.js';
import { BeanScopeError } from './beanScopeError.js';

const BeanModuleError = Symbol('BeanScopeBase#BeanModuleError');

export class BeanScopeBase extends BeanBase {
  private [BeanModuleError]: BeanScopeError;
  private __scenes: Record<string, any> = {};

  protected __get__(prop) {
    const moduleBelong = this.moduleBelong;
    // error
    if (prop === 'error') {
      if (!this[BeanModuleError]) {
        this[BeanModuleError] = this.bean._newBean(BeanScopeError, moduleBelong);
      }
      return this[BeanModuleError];
    }
    // scene
    if (!this.__scenes[prop]) {
      this.__scenes[prop] = this.bean._newBean(BeanScopeScene, moduleBelong, prop);
    }
    return this.__scenes[prop];
  }
}
