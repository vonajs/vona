import type { IQueueExecute, IQueuePushOptions } from 'vona-module-a-queue';
import { BeanQueueBase, Queue } from 'vona-module-a-queue';

export type TypeQueueMailJobData = unknown;

export type TypeQueueMailJobResult = void;

@Queue()
export class QueueMail
  extends BeanQueueBase<TypeQueueMailJobData, TypeQueueMailJobResult>
  implements IQueueExecute<TypeQueueMailJobData, TypeQueueMailJobResult> {
  async execute(_data: TypeQueueMailJobData, _options?: IQueuePushOptions): Promise<TypeQueueMailJobResult> {}
}
