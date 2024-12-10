import { Queue } from 'vona';
import { BeanQueueBase, IQueueExecute, IQueuePushOptions } from 'vona-module-a-queue';
import { ScopeModule } from '../.metadata/this.js';

export type TypeQueueProcessJobData = {
  path;
  options;
  message;
  messageClass;
};

export type TypeQueueProcessJobResult = void;

@Queue({ concurrency: true })
export class QueueProcess
  extends BeanQueueBase<ScopeModule, TypeQueueProcessJobData, TypeQueueProcessJobResult>
  implements IQueueExecute<TypeQueueProcessJobData, TypeQueueProcessJobResult>
{
  async execute(data: TypeQueueProcessJobData, _options?: IQueuePushOptions): Promise<TypeQueueProcessJobResult> {
    const { path, options, message, messageClass } = data;
    return await this.scope.service.ioInner.queueProcess({ path, options, message, messageClass });
  }
}
