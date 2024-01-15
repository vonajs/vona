import { CtxUtil } from '../utils/utilCtx.js';
import { CtxMockUtil } from '../utils/mockUtilCtx.js';
import { BeanBase } from '../module/bean/beanBase.js';

export class CtxMeta extends BeanBase {
  util: CtxUtil;
  mockUtil: CtxMockUtil;

  private __init__() {
    // util
    this.util = this.ctx.bean._newBean(CtxUtil);

    // mockUtil
    this.mockUtil = this.ctx.bean._newBean(CtxMockUtil);
  }
}
