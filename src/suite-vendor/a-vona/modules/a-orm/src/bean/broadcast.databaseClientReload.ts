import type { IBroadcastExecute } from 'vona-module-a-broadcast';
import type { ConfigDatabaseClient } from '../types/config.ts';
import type { IDatabaseClientRecord } from '../types/database.ts';
import { cast } from 'vona';
import { BeanBroadcastBase, Broadcast } from 'vona-module-a-broadcast';

export interface TypeBroadcastDatabaseClientReloadJobData {
  clientName?: keyof IDatabaseClientRecord;
  clientConfig?: ConfigDatabaseClient;
  extraData?: any;
}

@Broadcast()
export class BroadcastDatabaseClientReload
  extends BeanBroadcastBase<TypeBroadcastDatabaseClientReloadJobData>
  implements IBroadcastExecute<TypeBroadcastDatabaseClientReloadJobData> {
  async execute(data: TypeBroadcastDatabaseClientReloadJobData, isEmitter?: boolean) {
    const { clientName, clientConfig, extraData } = data;
    if (!isEmitter) {
      await cast(this.scope.service.database).__reloadAllClientsRaw(clientName, clientConfig, extraData);
    }
  }
}
