import { extend } from '@cabloy/extend';
import { CtxUtil } from '../utils/utilCtx.js';
import { CtxMockUtil } from '../utils/mockUtilCtx.js';
import { BeanSimple } from '../bean/beanSimple.js';

export class CtxMeta extends BeanSimple {
  util: CtxUtil;
  mockUtil: CtxMockUtil;
  /** dynamic middleware options */
  middlewares: Record<string, any>;

  protected __init__() {
    // util
    this.util = this.ctx.bean._newBean(CtxUtil);

    // mockUtil
    this.mockUtil = this.ctx.bean._newBean(CtxMockUtil);
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
