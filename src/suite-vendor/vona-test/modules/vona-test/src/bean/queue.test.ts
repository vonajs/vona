import { BeanQueueBase, type IQueueExecute, type IQueuePushOptions, Queue } from 'vona-module-a-queue';

export type TypeQueueTestJobData = {
  a: number;
  b: number;
};

export type TypeQueueTestJobResult = number;

@Queue()
export class QueueTest
  extends BeanQueueBase<TypeQueueTestJobData, TypeQueueTestJobResult>
  implements IQueueExecute<TypeQueueTestJobData, TypeQueueTestJobResult> {
  async execute(data: TypeQueueTestJobData, _options?: IQueuePushOptions): Promise<TypeQueueTestJobResult> {
    return data.a + data.b;
  }
}
