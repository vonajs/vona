import utilCtxFn from '../utils/utilCtx.js';
import mockUtilCtxFn from '../utils/mockUtilCtx.js';

export default function (ctx) {
  const meta = {} as any;
  // util
  meta.util = utilCtxFn(ctx);

  // mockUtil
  meta.mockUtil = mockUtilCtxFn(ctx);

  return meta;
}
