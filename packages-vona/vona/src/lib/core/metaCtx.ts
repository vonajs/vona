import { CtxUtil } from '../utils/utilCtx.js';
import { BeanSimple } from '../bean/beanSimple.js';

export class CtxMeta extends BeanSimple {
  util: CtxUtil;

  protected __init__() {
    // util
    this.util = this.bean._newBean(CtxUtil);
  }
}
