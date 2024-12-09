import { Queue } from 'vona';
import { BeanQueueBase, IQueueExecute, IQueueJobContext } from 'vona-module-a-queue';
import { ScopeModule } from '../.metadata/this.js';

export type TypeQueueTest1JobData = {
  a: number;
  b: number;
};

export type TypeQueueTest1JobResult = number;

@Queue()
export class QueueTest1
  extends BeanQueueBase<ScopeModule, TypeQueueTest1JobData, TypeQueueTest1JobResult>
  implements IQueueExecute<TypeQueueTest1JobData, TypeQueueTest1JobResult>
{
  async execute(context: IQueueJobContext<TypeQueueTest1JobData>): Promise<TypeQueueTest1JobResult> {
    return context.data.a;
  }
}
