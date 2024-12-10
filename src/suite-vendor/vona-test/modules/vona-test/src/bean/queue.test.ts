import { Queue } from 'vona';
import { BeanQueueBase, IQueueExecute, IQueuePushOptions } from 'vona-module-a-queue';
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
  async execute(data: TypeQueueTestJobData, _options?: IQueuePushOptions): Promise<TypeQueueTestJobResult> {
    return data.a + data.b;
  }
}
