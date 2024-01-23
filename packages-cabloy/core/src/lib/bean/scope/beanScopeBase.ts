import { BeanScopeBean } from './beanScopeBean.js';
import { BeanScopeScene } from './beanScopeScene.js';
import { BeanBase } from '../beanBase.js';
import { BeanScopeError } from '../resource/error/beanScopeError.js';
import { BeanScopeLocale } from '../resource/locale/beanScopeLocale.js';

const BeanModuleError = Symbol('BeanScopeBase#BeanModuleError');
const BeanModuleLocale = Symbol('BeanScopeBase#BeanModuleLocale');
const BeanModuleConfig = Symbol('BeanScopeBase#BeanModuleConfig');
const BeanModuleConstant = Symbol('BeanScopeBase#BeanModuleConstant');
const BeanModuleBean = Symbol('BeanScopeBase#BeanModuleBean');

export class BeanScopeBase extends BeanBase {
  private [BeanModuleError]: BeanScopeError;
  private [BeanModuleLocale]: BeanScopeLocale;
  private [BeanModuleConfig]: unknown;
  private [BeanModuleConstant]: unknown;
  private [BeanModuleBean]: BeanScopeBean;
  private __scenes: Record<string, BeanScopeScene> = {};

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
      if (!this[BeanModuleConfig]) {
        this[BeanModuleConfig] = this.ctx.config.module(moduleBelong);
      }
      return this[BeanModuleConfig];
    }
    // constant
    if (prop === 'constant') {
      if (!this[BeanModuleConstant]) {
        this[BeanModuleConstant] = this.ctx.constant.module(moduleBelong);
      }
      return this[BeanModuleConstant];
    }
    // _bean
    if (prop === '_bean') {
      if (!this[BeanModuleBean]) {
        this[BeanModuleBean] = this.bean._newBean(BeanScopeBean, moduleBelong);
      }
      return this[BeanModuleBean];
    }
    // scene
    if (!this.__scenes[prop]) {
      this.__scenes[prop] = this.bean._newBean(BeanScopeScene, moduleBelong, prop);
    }
    return this.__scenes[prop];
  }
}
