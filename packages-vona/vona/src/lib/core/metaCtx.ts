import { CtxUtil } from '../utils/utilCtx.js';
import { BeanSimple } from '../bean/beanSimple.js';

import { ConfigOnions, IMiddlewareRecord, PowerPartial } from '../../types/index.js';

export class CtxMeta extends BeanSimple {
  util: CtxUtil;

  /** dynamic onion middleware options */
  onionsDynamic?: PowerPartial<ConfigOnions>;

  protected __init__() {
    // util
    this.util = this.bean._newBean(CtxUtil);
  }

  getMiddlewareOptions<T extends keyof IMiddlewareRecord>(middlewareName: T) {
    const item = this.app.meta.onionMiddleware.getMiddlewareItem(middlewareName);
    return this.app.meta.onionMiddleware.combineMiddlewareOptions(this.ctx, item);
  }
}
