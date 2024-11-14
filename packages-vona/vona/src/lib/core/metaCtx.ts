import { CtxUtil } from '../utils/utilCtx.js';
import { CtxMockUtil } from '../utils/mockUtilCtx.js';
import { BeanSimple } from '../bean/beanSimple.js';
import { CtxLocale } from '../bean/resource/locale/localeCtx.js';
import { IModuleLocaleText } from '../bean/index.js';
import { IMiddlewareRecord } from '../../types/index.js';

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

  getMiddlewareOptions<T extends keyof IMiddlewareRecord>(middlewareName: T) {
    const item = this.app.meta.onionMiddleware.getMiddlewareItem(middlewareName);
    return this.app.meta.onionMiddleware.combineMiddlewareOptions(this.ctx, item);
  }
}
