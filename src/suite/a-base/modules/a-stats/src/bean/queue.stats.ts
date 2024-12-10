import { Queue } from 'vona';
import { BeanQueueBase, IQueueExecute, IQueuePushOptions } from 'vona-module-a-queue';
import { ScopeModule } from '../.metadata/this.js';

export type TypeQueueStatsJobData = { module; name; nameSub; user };

export type TypeQueueStatsJobResult = void;

@Queue()
export class QueueStats
  extends BeanQueueBase<ScopeModule, TypeQueueStatsJobData, TypeQueueStatsJobResult>
  implements IQueueExecute<TypeQueueStatsJobData, TypeQueueStatsJobResult>
{
  async execute(data: TypeQueueStatsJobData, _options?: IQueuePushOptions): Promise<TypeQueueStatsJobResult> {
    return await this.app.bean.stats._notify_queue(data);
  }
}
