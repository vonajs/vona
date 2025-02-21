import type { IBroadcastEmitOptions, IBroadcastJobContext } from '../types/broadcast.ts';
import { BeanBase, deepExtend } from 'vona';

export class BeanBroadcastBase<DATA = unknown> extends BeanBase {
  emit(data?: DATA, options?: IBroadcastEmitOptions) {
    return this.$scope.broadcast.service.broadcast.emit(this._prepareInfo(data, options));
  }

  private _prepareInfo(data?: DATA, options?: IBroadcastEmitOptions): IBroadcastJobContext<DATA> {
    options = deepExtend({}, options)!;
    if (this.ctx) {
      options.locale = options.locale === undefined ? this.ctx.locale : options.locale;
      options.instanceName = options.instanceName === undefined ? this.ctx.instanceName : options.instanceName;
    }
    return {
      broadcastName: this.onionName as never,
      data,
      options,
    };
  }
}
