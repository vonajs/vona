import { Queue } from 'vona';
import { BeanQueueBase, IQueueExecute, IQueuePushOptions } from 'vona-module-a-queue';
import * as Bull from 'bullmq';
import { ScopeModule } from '../.metadata/this.js';

export type TypeQueueScheduleJobData = {
  scheduleName: string;
};

export type TypeQueueScheduleJobResult = void;

@Queue()
export class QueueSchedule
  extends BeanQueueBase<ScopeModule, TypeQueueScheduleJobData, TypeQueueScheduleJobResult>
  implements IQueueExecute<TypeQueueScheduleJobData, TypeQueueScheduleJobResult>
{
  async execute(
    data: TypeQueueScheduleJobData,
    _options?: IQueuePushOptions,
    job?: Bull.Job,
  ): Promise<TypeQueueScheduleJobResult> {
    await this.scope.service.schedule.execute(data.scheduleName, job);
  }
}
