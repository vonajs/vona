import type { IQueueExecute, IQueuePushOptions } from 'vona-module-a-queue';
import { BeanQueueBase, Queue } from 'vona-module-a-queue';

export interface TypeQueueDoubleDeleteJobData {
  method: 'cacheEntityDel' | 'cacheEntityClear' | 'cacheQueryClear';
}

export type TypeQueueDoubleDeleteJobResult = void;

@Queue({
  options: { job: { delay: 1 * 1000 } },
})
export class QueueDoubleDelete
  extends BeanQueueBase<TypeQueueDoubleDeleteJobData, TypeQueueDoubleDeleteJobResult>
  implements IQueueExecute<TypeQueueDoubleDeleteJobData, TypeQueueDoubleDeleteJobResult> {
  async execute(_data: TypeQueueDoubleDeleteJobData, _options?: IQueuePushOptions): Promise<TypeQueueDoubleDeleteJobResult> {}
}
