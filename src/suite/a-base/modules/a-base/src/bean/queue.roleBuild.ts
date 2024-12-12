import { Queue } from 'vona';
import { BeanQueueBase, IQueueExecute, IQueuePushOptions } from 'vona-module-a-queue';

export type TypeQueueRoleBuildJobData = { options };

export type TypeQueueRoleBuildJobResult = void;

@Queue()
export class QueueRoleBuild
  extends BeanQueueBase<ScopeModule, TypeQueueRoleBuildJobData, TypeQueueRoleBuildJobResult>
  implements IQueueExecute<TypeQueueRoleBuildJobData, TypeQueueRoleBuildJobResult>
{
  async execute(data: TypeQueueRoleBuildJobData, _options?: IQueuePushOptions): Promise<TypeQueueRoleBuildJobResult> {
    const { options } = data;
    await this.app.bean.role._buildQueue(options);
  }
}
