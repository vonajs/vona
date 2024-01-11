import utilCtxFn from '../utils/utilCtx.js';
import { AppMockUtilCtx } from '../utils/mockUtilCtx.js';

export default function (ctx) {
  const meta = {} as any;
  // util
  meta.util = utilCtxFn(ctx);

  // mockUtil
  meta.mockUtil = ctx.bean._newBean(AppMockUtilCtx);

  return meta;
}
