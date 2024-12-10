import { Queue } from 'vona';
import { BeanQueueBase, IQueueExecute, IQueuePushOptions } from 'vona-module-a-queue';
import { ScopeModule } from '../.metadata/this.js';

export type TypeQueuePushJobData = {
  options;
  message;
  messageSyncs;
  messageClass;
};

export type TypeQueuePushJobResult = void;

@Queue({ concurrency: true })
export class QueuePush
  extends BeanQueueBase<ScopeModule, TypeQueuePushJobData, TypeQueuePushJobResult>
  implements IQueueExecute<TypeQueuePushJobData, TypeQueuePushJobResult>
{
  async execute(data: TypeQueuePushJobData, _options?: IQueuePushOptions): Promise<TypeQueuePushJobResult> {
    const { options, message, messageSyncs, messageClass } = data;
    return await this.scope.service.ioInner.queuePush({ options, message, messageSyncs, messageClass });
  }
}
