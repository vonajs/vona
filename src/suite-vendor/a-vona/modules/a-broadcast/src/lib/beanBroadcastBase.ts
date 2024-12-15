import { BeanBase } from 'vona';
import { IBroadcastJobContext } from '../types/broadcast.js';

export class BeanBroadcastBase<DATA = unknown> extends BeanBase {
  emit(data: DATA) {
    return this.$scope.broadcast.service.broadcast.emit(this._prepareInfo(data));
  }

  private _prepareInfo(data: DATA): IBroadcastJobContext<DATA> {
    return {
      broadcastName: this.onionName as never,
      data,
    };
  }
}
