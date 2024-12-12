import { BeanQueueBase, IQueueExecute, IQueuePushOptions, Queue } from 'vona-module-a-queue';

export type TypeQueueTest1JobData = unknown;

export type TypeQueueTest1JobResult = void;

@Queue()
export class QueueTest1
  extends BeanQueueBase<TypeQueueTest1JobData, TypeQueueTest1JobResult>
  implements IQueueExecute<TypeQueueTest1JobData, TypeQueueTest1JobResult>
{
  async execute(_data: TypeQueueTest1JobData, _options?: IQueuePushOptions): Promise<TypeQueueTest1JobResult> {}
}
