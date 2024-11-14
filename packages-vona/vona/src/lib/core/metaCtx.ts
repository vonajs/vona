import { extend } from '@cabloy/extend';
import { CtxUtil } from '../utils/utilCtx.js';
import { CtxMockUtil } from '../utils/mockUtilCtx.js';
import { BeanSimple } from '../bean/beanSimple.js';
import { CtxLocale } from '../bean/resource/locale/localeCtx.js';
import { IModuleLocaleText } from '../bean/index.js';
import { IMiddlewareItem } from '../../types/index.js';

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

  combineMiddlewareOptions(item: IMiddlewareItem) {
    // options: meta
    const optionsMeta = item.options;
    // options: config
    let optionsConfig;
    if (item.fromConfig) {
      const config = this.ctx.config?.module(item.beanOptions.module);
      optionsConfig = config?.middlewares?.[item.name];
    } else {
      optionsConfig = this.app.config.metadata[item.beanOptions.scene]?.[item.name];
    }
    // options: route
    const route = this.ctx.route.route;
    const optionsRoute = route.meta?.[item.fromConfig ? item.name : item.beanOptions.beanFullName];
    // options: argument pipe
    const optionsPipe = item.pipeOptions;
    // options: dynamic
    const optionsDynamic = this.middlewares[item.fromConfig ? item.name : item.beanOptions.beanFullName];
    // final options
    const options = extend(true, {}, optionsMeta, optionsConfig, optionsRoute, optionsPipe, optionsDynamic);
    // ok
    return options;
  }
}
