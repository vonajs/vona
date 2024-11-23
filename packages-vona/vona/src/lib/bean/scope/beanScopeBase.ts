import { BeanScopeBean } from './beanScopeBean.js';
import { BeanScopeScene } from './beanScopeScene.js';
import { BeanBaseSimple } from '../beanBaseSimple.js';
import { BeanScopeError } from '../resource/error/beanScopeError.js';
import { BeanScopeLocale } from '../resource/locale/beanScopeLocale.js';
import { IModule } from '@cabloy/module-info';
import { BeanScopeUtil } from './beanScopeUtil.js';

const BeanModuleError = Symbol('BeanScopeBase#BeanModuleError');
const BeanModuleLocale = Symbol('BeanScopeBase#BeanModuleLocale');
const BeanModuleConstant = Symbol('BeanScopeBase#BeanModuleConstant');
const BeanModuleBean = Symbol('BeanScopeBase#BeanModuleBean');
const BeanModuleUtil = Symbol('BeanScopeBase#BeanModuleUtil');

export class BeanScopeBase extends BeanBaseSimple {
  private [BeanModuleError]: BeanScopeError;
  private [BeanModuleLocale]: BeanScopeLocale;
  private [BeanModuleConstant]: unknown;
  private [BeanModuleBean]: BeanScopeBean;
  private [BeanModuleUtil]: BeanScopeUtil;
  private __scenes: Record<string, BeanScopeScene> = {};

  get module(): IModule {
    return this.app.meta.modules[this.moduleBelong];
  }

  protected __get__(prop: string) {
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
      // app or ctx
      const config = this.ctx ? this.ctx.config : this.app.config;
      return config.modules[moduleBelong];
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
    // util
    if (prop === 'util') {
      if (!this[BeanModuleUtil]) {
        this[BeanModuleUtil] = this.bean._newBean(BeanScopeUtil, moduleBelong);
      }
      return this[BeanModuleUtil];
    }
    // scene
    if (!this.__scenes[prop]) {
      this.__scenes[prop] = this.bean._newBean(BeanScopeScene, moduleBelong, prop);
    }
    return this.__scenes[prop];
  }
}
