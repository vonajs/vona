import { BeanScopeScene } from './beanScopeScene.js';
import { BeanBase } from '../beanBase.js';
import { BeanScopeError } from '../resource/error/beanScopeError.js';
import { BeanScopeLocale } from '../resource/locale/beanScopeLocale.js';

const BeanModuleError = Symbol('BeanScopeBase#BeanModuleError');
const BeanModuleLocale = Symbol('BeanScopeBase#BeanModuleLocale');

export class BeanScopeBase extends BeanBase {
  private [BeanModuleError]: BeanScopeError;
  private [BeanModuleLocale]: BeanScopeLocale;
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
    // locale
    if (prop === 'locale') {
      if (!this[BeanModuleLocale]) {
        this[BeanModuleLocale] = this.bean._newBean(BeanScopeLocale, moduleBelong);
      }
      return this[BeanModuleLocale];
    }
    // config
    if (prop === 'config') {
      return this.ctx.config.module(moduleBelong);
    }
    // constant
    if (prop === 'constant') {
      return this.ctx.constant.module(moduleBelong);
    }
    // scene
    if (!this.__scenes[prop]) {
      this.__scenes[prop] = this.bean._newBean(BeanScopeScene, moduleBelong, prop);
    }
    return this.__scenes[prop];
  }
}
