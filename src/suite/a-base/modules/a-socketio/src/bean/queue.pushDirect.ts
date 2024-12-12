import { BeanQueueBase, IQueueExecute, IQueuePushOptions, Queue } from 'vona-module-a-queue';

export type TypeQueuePushDirectJobData = { options; content; channel };

export type TypeQueuePushDirectJobResult = any;

@Queue({ concurrency: true })
export class QueuePushDirect
  extends BeanQueueBase<TypeQueuePushDirectJobData, TypeQueuePushDirectJobResult>
  implements IQueueExecute<TypeQueuePushDirectJobData, TypeQueuePushDirectJobResult>
{
  async execute(data: TypeQueuePushDirectJobData, _options?: IQueuePushOptions): Promise<TypeQueuePushDirectJobResult> {
    const { options, content, channel } = data;
    return await this.scope.service.ioInner.queuePushDirect({ options, content, channel });
  }
}
