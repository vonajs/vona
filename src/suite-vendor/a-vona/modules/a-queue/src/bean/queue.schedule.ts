import { Queue } from 'vona';
import { BeanQueueBase, IQueueExecute, IQueueJobContext } from 'vona-module-a-queue';
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
    context: IQueueJobContext<TypeQueueScheduleJobData>,
    job: Bull.Job,
  ): Promise<TypeQueueScheduleJobResult> {
    await this.scope.service.schedule.execute(context.data.scheduleName, job);
  }
}
