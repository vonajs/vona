import { CtxUtil } from '../utils/utilCtx.js';
import { CtxMockUtil } from '../utils/mockUtilCtx.js';
import { BeanBase } from './bean/beanBase.js';

export class CtxMeta extends BeanBase {
  util: CtxUtil = null as any;
  mockUtil: CtxMockUtil = null as any;

  __init__() {
    // util
    this.util = this.ctx.bean._newBean(CtxUtil);

    // mockUtil
    this.mockUtil = this.ctx.bean._newBean(CtxMockUtil);
  }
}
