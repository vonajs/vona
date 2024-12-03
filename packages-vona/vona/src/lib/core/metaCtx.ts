import { CtxUtil } from '../utils/utilCtx.js';
import { CtxMockUtil } from '../utils/mockUtilCtx.js';
import { BeanSimple } from '../bean/beanSimple.js';

import { ConfigOnion, IMiddlewareRecord, PowerPartial } from '../../types/index.js';

export class CtxMeta extends BeanSimple {
  util: CtxUtil;
  mockUtil: CtxMockUtil;

  /** dynamic onion middleware options */
  onionDynamic?: PowerPartial<ConfigOnion>;

  protected __init__() {
    // util
    this.util = this.bean._newBean(CtxUtil);
    // mockUtil
    this.mockUtil = this.bean._newBean(CtxMockUtil);
  }

  getMiddlewareOptions<T extends keyof IMiddlewareRecord>(middlewareName: T) {
    const item = this.app.meta.onionMiddleware.getMiddlewareItem(middlewareName);
    return this.app.meta.onionMiddleware.combineMiddlewareOptions(this.ctx, item);
  }
}
