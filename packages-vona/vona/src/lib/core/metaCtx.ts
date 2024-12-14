import { CtxUtil } from '../utils/utilCtx.js';
import { BeanSimple } from '../bean/beanSimple.js';

import { ConfigOnions, PowerPartial } from '../../types/index.js';

export class CtxMeta extends BeanSimple {
  util: CtxUtil;

  /** dynamic onions middleware options */
  onionsDynamic?: PowerPartial<ConfigOnions>;

  protected __init__() {
    // util
    this.util = this.bean._newBean(CtxUtil);
  }
}
