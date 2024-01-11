import { CtxUtil } from '../utils/utilCtx.js';
import { CtxMockUtil } from '../utils/mockUtilCtx.js';

export default function (ctx) {
  const meta = {} as any;
  // util
  meta.util = ctx.bean._newBean(CtxUtil);

  // mockUtil
  meta.mockUtil = ctx.bean._newBean(CtxMockUtil);

  return meta;
}
