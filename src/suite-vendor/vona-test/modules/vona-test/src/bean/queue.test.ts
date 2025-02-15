import type { IQueueExecute, IQueuePushOptions } from 'vona-module-a-queue';
import { BeanQueueBase, Queue } from 'vona-module-a-queue';

export interface TypeQueueTestJobData {
  a: number;
  b: number;
}

export type TypeQueueTestJobResult = number;

@Queue()
export class QueueTest
  extends BeanQueueBase<TypeQueueTestJobData, TypeQueueTestJobResult>
  implements IQueueExecute<TypeQueueTestJobData, TypeQueueTestJobResult> {
  async execute(data: TypeQueueTestJobData, _options?: IQueuePushOptions): Promise<TypeQueueTestJobResult> {
    return data.a + data.b;
  }
}
