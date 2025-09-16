import type { IQueueExecute, IQueuePushOptions } from 'vona-module-a-queue';
import type { IDatabaseClientRecord } from '../types/database.ts';
import type { ITableRecord } from '../types/onion/table.ts';
import { BeanQueueBase, Queue } from 'vona-module-a-queue';

export interface TypeQueueDoubleDeleteJobData {
  beanFullName: string;
  clientName: keyof IDatabaseClientRecord;
  table: keyof ITableRecord;
  method: '_cacheEntityDelInner' | '_cacheEntityClearInner' | '_cacheQueryClearInner';
  args: any[];
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
