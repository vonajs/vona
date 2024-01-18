import { CtxUtil } from '../utils/utilCtx.js';
import { CtxMockUtil } from '../utils/mockUtilCtx.js';
import { BeanSimple } from '../module/bean/beanSimple.js';

export class CtxMeta extends BeanSimple {
  util: CtxUtil;
  mockUtil: CtxMockUtil;

  protected __init__() {
    // util
    this.util = this.ctx.bean._newBean(CtxUtil);

    // mockUtil
    this.mockUtil = this.ctx.bean._newBean(CtxMockUtil);
  }
}
