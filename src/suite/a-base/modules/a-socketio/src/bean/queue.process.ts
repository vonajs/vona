import { BeanQueueBase, IQueueExecute, IQueuePushOptions, Queue } from 'vona-module-a-queue';

export type TypeQueueProcessJobData = {
  path;
  options;
  message;
  messageClass;
};

export type TypeQueueProcessJobResult = void;

@Queue({ concurrency: true })
export class QueueProcess
  extends BeanQueueBase<TypeQueueProcessJobData, TypeQueueProcessJobResult>
  implements IQueueExecute<TypeQueueProcessJobData, TypeQueueProcessJobResult>
{
  async execute(data: TypeQueueProcessJobData, _options?: IQueuePushOptions): Promise<TypeQueueProcessJobResult> {
    const { path, options, message, messageClass } = data;
    return await this.scope.service.ioInner.queueProcess({ path, options, message, messageClass });
  }
}
