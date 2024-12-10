import { Queue } from 'vona';
import { BeanQueueBase, IQueueExecute, IQueuePushOptions } from 'vona-module-a-queue';
import * as Bull from 'bullmq';
import { ScopeModule } from '../.metadata/this.js';
import { FlowNodeStartEventTimer } from './flow.node.startEventTimer.js';

export type TypeQueueStartEventTimerJobData = {
  flowDefId: number;
  node: any;
};

export type TypeQueueStartEventTimerJobResult = void;

@Queue({ concurrency: true })
export class QueueStartEventTimer
  extends BeanQueueBase<ScopeModule, TypeQueueStartEventTimerJobData, TypeQueueStartEventTimerJobResult>
  implements IQueueExecute<TypeQueueStartEventTimerJobData, TypeQueueStartEventTimerJobResult>
{
  async execute(
    data: TypeQueueStartEventTimerJobData,
    _options?: IQueuePushOptions,
    job?: Bull.Job,
  ): Promise<TypeQueueStartEventTimerJobResult> {
    const _nodeBaseBean = this.app.bean._newBean(FlowNodeStartEventTimer);
    await _nodeBaseBean._runSchedule(data, job);
  }
}
