import performActionFn from './performAction.js';
import { BeanSimple } from '../bean/beanSimple.js';
import { VonaContext, PowerPartial } from '../../types/index.js';
import { IExecuteBeanCallback } from './util.js';
import { ILocalInfos } from '../bean/resource/locale/type.js';
import { PerformActionParams } from './type.js';

export class CtxUtil extends BeanSimple {
  runInBackground(scope) {
    const ctx = this.ctx;
    ctx.runInBackground(async () => {
      await ctx.meta.util.executeBeanIsolate({
        fn: async ({ ctx }) => {
          await scope({ ctx });
        },
      });
    });
  }

  broadcastEmit({ locale, subdomain, module, broadcastName, data }: any) {
    const ctx = this.ctx;
    ctx.app.meta.broadcast.emit({
      locale: locale === undefined ? ctx.locale : locale,
      subdomain: subdomain === undefined ? ctx.subdomain : subdomain,
      module,
      broadcastName,
      data,
    });
  }

  // todo: url should not be relative path, should be absolute
  //       because ctxCaller.module removed
  //       so, maybe need provide this.scope.util.combineUrl
  //          this result is: /api/a/user/add, thus the method of combineApiPath not needed in performActionFn
  async performAction<T = any>({
    innerAccess,
    method,
    url,
    query,
    params,
    headers,
    body,
    onion,
  }: PerformActionParams): Promise<T> {
    const ctx = this.ctx;
    return await performActionFn({
      ctxCaller: ctx,
      innerAccess,
      method,
      url,
      query,
      params,
      headers,
      body,
      onion,
    });
  }
}
