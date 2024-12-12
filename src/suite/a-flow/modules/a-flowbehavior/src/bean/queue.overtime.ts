import { Queue } from 'vona';
import { BeanQueueBase, IQueueExecute, IQueuePushOptions } from 'vona-module-a-queue';
import { FlowBehaviorOvertime } from './flow.behavior.overtime.js';

export type TypeQueueOvertimeJobData = {
  flowId: number;
  flowNodeId: number;
  behaviorDefId: number;
};

export type TypeQueueOvertimeJobResult = void;

@Queue()
export class QueueOvertime
  extends BeanQueueBase<ScopeModule, TypeQueueOvertimeJobData, TypeQueueOvertimeJobResult>
  implements IQueueExecute<TypeQueueOvertimeJobData, TypeQueueOvertimeJobResult>
{
  async execute(data: TypeQueueOvertimeJobData, _options?: IQueuePushOptions): Promise<TypeQueueOvertimeJobResult> {
    const _behaviorBean = this.app.bean._newBean(FlowBehaviorOvertime);
    await _behaviorBean._runJob(data);
  }
}
