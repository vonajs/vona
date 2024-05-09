import { extend } from '@cabloy/extend';
import { CtxUtil } from '../utils/utilCtx.js';
import { CtxMockUtil } from '../utils/mockUtilCtx.js';
import { BeanSimple } from '../bean/beanSimple.js';
import { CtxLocale } from '../bean/resource/locale/localeCtx.js';
import { IModuleLocaleText } from '../bean/index.js';

export class CtxMeta extends BeanSimple {
  util: CtxUtil;
  mockUtil: CtxMockUtil;
  locale: CtxLocale;
  text: IModuleLocaleText;
  /** dynamic middleware options */
  middlewares: Record<string, any>;

  protected __init__() {
    // util
    this.util = this.ctx.bean._newBean(CtxUtil);
    // mockUtil
    this.mockUtil = this.ctx.bean._newBean(CtxMockUtil);
    // locale
    this.locale = this.ctx.bean._newBean(CtxLocale);
    // text
    this.text = this.locale.createLocaleText();
  }

  getMiddlewareOptions(middlewareName) {
    const item = this.app.meta.middlewaresNormal[middlewareName];
    // config options
    const config = this.ctx.config.module(item.module);
    const optionsConfig = config.middlewares ? config.middlewares[item.name] : null;
    // route options
    const route = this.ctx.route.route;
    const optionsRoute = route.meta ? route.meta[item.name] : null;
    // dynamic options
    const optionsDynamic = this.middlewares[item.name];
    // final options
    const options = extend(true, {}, optionsConfig, optionsRoute, optionsDynamic);
    // ok
    return options;
  }
}
