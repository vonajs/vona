import { BeanBase, deepExtend } from 'vona';
import { IQueueJobContext, IQueuePushOptions, IQueueRecord } from '../types/queue.js';

export class BeanBroadcastBase<DATA = unknown> extends BeanBase {
  push(data: DATA) {
    return this.$scope.queue.service.queue.push(this._prepareInfo(data, options));
  }

  getQueue(subdomain?: string) {
    return this.$scope.queue.service.queue.getQueue(this.onionName as keyof IQueueRecord, subdomain);
  }

  private _prepareInfo(data: DATA, options?: IQueuePushOptions): IQueueJobContext<DATA> {
    options = deepExtend({ extraData: { headers: {} } }, options)!;
    if (!this.ctx) {
      options.dbLevel = options.dbLevel ?? 1;
    } else {
      options.dbLevel = options.dbLevel ?? this.ctx.dbLevel + 1;
      options.locale = options.locale === undefined ? this.ctx.locale : options.locale;
      options.subdomain = options.subdomain === undefined ? this.ctx.subdomain : options.subdomain;
      // extraData: headers
      const headers = options.extraData!.headers!;
      for (const key in this.ctx.request.headers) {
        if (key.startsWith('x-vona-data-') && !headers[key]) {
          const value = this.ctx.request.headers[key];
          if (value) {
            headers[key] = value as string;
          }
        }
      }
      // for (const key of ['x-clientid', 'x-scene']) {
      //   if (!headers[key]) {
      //     const value =
      //       key === 'x-clientid'
      //         ? (<any>ctx.app.bean).util.getFrontClientId()
      //         : (<any>ctx.app.bean).util.getFrontScene();
      //     if (value) {
      //       headers[key] = value;
      //     }
      //   }
      // }
      // for (const key of ['host', 'origin', 'referer', 'user-agent']) {
      //   if (!headers[key]) {
      //     const value = this.ctx.request.headers[key];
      //     if (value) {
      //       headers[key] = value;
      //     }
      //   }
      // }
    }
    // info
    return {
      queueName: this.onionName as never,
      data,
      options,
    };
  }
}
