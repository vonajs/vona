import { BeanBase } from 'vona';
import { IQueuePushOptions, IQueueRecord } from '../types/queue.js';

export class BeanQueueBase<DATA = unknown, RESULT = unknown> extends BeanBase {
  async pushAsync(data: DATA, options?: IQueuePushOptions): Promise<RESULT> {
    return await this.$scope.queue.service.queue.pushAsync<DATA, RESULT>(
      this.$scope.queue.service.queue.prepareJobInfo(this.onionName as any, data, options),
    );
  }

  push(data: DATA, options?: IQueuePushOptions) {
    return this.$scope.queue.service.queue.push(
      this.$scope.queue.service.queue.prepareJobInfo(this.onionName as any, data, options),
    );
  }

  getQueue(instanceName?: string) {
    return this.$scope.queue.service.queue.getQueue(this.onionName as keyof IQueueRecord, instanceName);
  }
}
