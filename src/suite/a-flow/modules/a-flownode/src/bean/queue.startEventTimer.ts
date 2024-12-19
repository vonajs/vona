import { BeanQueueBase, IQueueExecute, IQueuePushOptions, Queue, TypeQueueJob } from 'vona-module-a-queue';
import { FlowNodeStartEventTimer } from './flow.node.startEventTimer.js';

export type TypeQueueStartEventTimerJobData = {
  flowDefId: number;
  node: any;
};

export type TypeQueueStartEventTimerJobResult = void;

@Queue()
export class QueueStartEventTimer
  extends BeanQueueBase<TypeQueueStartEventTimerJobData, TypeQueueStartEventTimerJobResult>
  implements IQueueExecute<TypeQueueStartEventTimerJobData, TypeQueueStartEventTimerJobResult>
{
  async execute(
    data: TypeQueueStartEventTimerJobData,
    _options?: IQueuePushOptions,
    job?: TypeQueueJob<TypeQueueStartEventTimerJobData, TypeQueueStartEventTimerJobResult>,
  ): Promise<TypeQueueStartEventTimerJobResult> {
    const _nodeBaseBean = this.app.bean._newBean(FlowNodeStartEventTimer);
    await _nodeBaseBean._runSchedule(data, job);
  }
}
