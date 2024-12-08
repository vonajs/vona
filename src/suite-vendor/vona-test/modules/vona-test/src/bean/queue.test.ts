import { BeanBase, IQueueExecute, Queue } from 'vona';

export type TypeQueueJobDataTest = {
  a: number;
  b: number;
};

@Queue()
export class QueueTest extends BeanBase implements IQueueExecute {
  async execute(context) {
    const data = context.data;
    return data.a + data.b;
  }
}
