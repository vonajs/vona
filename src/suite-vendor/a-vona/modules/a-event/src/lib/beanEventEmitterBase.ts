import { BeanBase } from 'vona';

export class BeanEventEmitterBase<DATA = unknown, RESULT = unknown> extends BeanBase {
  async emit(data: DATA): Promise<RESULT> {
    return await this.$scope.queue.service.queue.pushAsync<DATA, RESULT>(this._prepareInfo(data, options));
  }
}
