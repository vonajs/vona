import { IScheduleRecord, Queue } from 'vona';
import * as Bull from 'bullmq';
import { ScopeModule } from '../.metadata/this.js';
import { BeanQueueBase, IQueueExecute, IQueuePushOptions } from 'vona-module-a-queue';

export type TypeQueueScheduleJobData = {
  scheduleName: keyof IScheduleRecord;
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
