import { IScheduleRecord, Queue } from 'vona';
import { ScopeModule } from '../.metadata/this.js';
import { BeanQueueBase, IQueueExecute, IQueuePushOptions } from 'vona-module-a-queue';
import { TypeScheduleJob } from '../types/schedule.js';

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
    job?: TypeScheduleJob,
  ): Promise<TypeQueueScheduleJobResult> {
    await this.scope.service.schedule.execute(data.scheduleName, job);
  }
}
