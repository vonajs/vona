import { Queue } from 'vona';
import { BeanQueueBase, IQueueExecute, IQueueJobContext } from 'vona-module-a-queue';
import { ScopeModule } from '../.metadata/this.js';

export type TypeQueueTestJobData = {
  a: number;
  b: number;
};

export type TypeQueueTestJobResult = number;

@Queue()
export class QueueTest
  extends BeanQueueBase<ScopeModule, TypeQueueTestJobData, TypeQueueTestJobResult>
  implements IQueueExecute<TypeQueueTestJobData, TypeQueueTestJobResult>
{
  async execute(context: IQueueJobContext<TypeQueueTestJobData>): Promise<TypeQueueTestJobResult> {
    const data = context.data;
    return data.a + data.b;
  }
}
