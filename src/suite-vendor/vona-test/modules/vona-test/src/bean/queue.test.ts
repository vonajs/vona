import { IQueueExecute, Queue } from 'vona';
import { BeanQueueBase } from 'vona-module-a-queue';

export type TypeQueueJobDataTest = {
  a: number;
  b: number;
};

@Queue()
export class QueueTest extends BeanQueueBase implements IQueueExecute {
  async execute(context) {
    const data = context.data;
    return data.a + data.b;
  }
}
