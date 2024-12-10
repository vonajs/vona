import { BeanBase, IQueueRecord, VonaContext } from 'vona';
import { IQueueJobContext, IQueuePushOptions } from '../types/queue.js';

export class BeanQueueBase<TScopeModule = unknown, DATA = unknown, RESULT = unknown> extends BeanBase<TScopeModule> {
  async pushAsync(data: DATA, options?: IQueuePushOptions): Promise<RESULT> {
    return await this.$scope.queue.service.queue.pushAsync<DATA, RESULT>(this._prepareInfo(data, options));
  }

  push(data: DATA, options?: IQueuePushOptions) {
    return this.$scope.queue.service.queue.push(this._prepareInfo(data, options));
  }

  getQueue(subdomain?: string) {
    return this.$scope.queue.service.queue.getQueue(this.onionName as keyof IQueueRecord, subdomain);
  }

  private _prepareInfo(data: DATA, options?: IQueuePushOptions): IQueueJobContext<DATA> {
    options = Object.assign({}, options);
    if (!this.ctx) {
      options.dbLevel = !options.dbLevel ? 1 : options.dbLevel;
    } else {
      options.dbLevel = !options.dbLevel ? this.ctx.dbLevel + 1 : options.dbLevel;
      options.locale = options.locale === undefined ? this.ctx.locale : options.locale;
      options.subdomain = options.subdomain === undefined ? this.ctx.subdomain : options.subdomain;
      // ctxParent
      if (!options.ctxParent) options.ctxParent = {} as VonaContext;
      if (!options.ctxParent.request) options.ctxParent.request = {} as any;
      if (!options.ctxParent.request.headers) options.ctxParent.request.headers = {};
      // headers
      const headers = options.ctxParent.request.headers;
      // for (const key of ['x-clientid', 'x-scene']) {
      //   if (!headers[key]) {
      //     const value =
      //       key === 'x-clientid' ? (<any>ctx.app.bean).util.getFrontClientId() : (<any>ctx.app.bean).util.getFrontScene();
      //     if (value) {
      //       headers[key] = value;
      //     }
      //   }
      // }
      for (const key of ['host', 'origin', 'referer', 'user-agent']) {
        if (!headers[key]) {
          const value = this.ctx.request.headers[key];
          if (value) {
            headers[key] = value;
          }
        }
      }
    }
    // info
    return {
      queueName: this.onionName as never,
      data,
      options,
    };
  }
}
