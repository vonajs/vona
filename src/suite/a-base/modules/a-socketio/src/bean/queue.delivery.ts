import { Queue } from 'vona';
import { BeanQueueBase, IQueueExecute, IQueuePushOptions } from 'vona-module-a-queue';

export type TypeQueueDeliveryJobData = {
  path;
  options;
  message;
  messageSyncs;
  messageClass;
};

export type TypeQueueDeliveryJobResult = void;

@Queue({ concurrency: true })
export class QueueDelivery
  extends BeanQueueBase<TypeQueueDeliveryJobData, TypeQueueDeliveryJobResult>
  implements IQueueExecute<TypeQueueDeliveryJobData, TypeQueueDeliveryJobResult>
{
  async execute(data: TypeQueueDeliveryJobData, _options?: IQueuePushOptions): Promise<TypeQueueDeliveryJobResult> {
    const { path, options, message, messageSyncs, messageClass } = data;
    return await this.scope.service.ioInner.queueDelivery({ path, options, message, messageSyncs, messageClass });
  }
}
