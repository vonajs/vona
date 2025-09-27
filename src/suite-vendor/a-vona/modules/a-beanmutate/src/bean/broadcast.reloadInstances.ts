import type { IBroadcastExecute } from 'vona-module-a-broadcast';
import type { ConfigDatabaseClient } from '../types/config.ts';
import type { IDatabaseClientRecord } from '../types/database.ts';
import { cast } from 'vona';
import { BeanBroadcastBase, Broadcast } from 'vona-module-a-broadcast';

export interface TypeBroadcastReloadInstancesJobData {
  clientName?: keyof IDatabaseClientRecord;
  clientConfig?: ConfigDatabaseClient;
  extraData?: any;
}

@Broadcast()
export class BroadcastReloadInstances
  extends BeanBroadcastBase<TypeBroadcastReloadInstancesJobData>
  implements IBroadcastExecute<TypeBroadcastReloadInstancesJobData> {
  async execute(data: TypeBroadcastReloadInstancesJobData, isEmitter?: boolean) {
    if (!isEmitter) {
      await this.bean.mutate.reloadInstancesWorker(data);
    }
  }
}
