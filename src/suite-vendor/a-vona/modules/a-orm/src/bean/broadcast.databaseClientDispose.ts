import type { IBroadcastExecute } from 'vona-module-a-broadcast';
import type { IDatabaseClientRecord } from '../types/database.ts';
import { cast } from 'vona';
import { BeanBroadcastBase, Broadcast } from 'vona-module-a-broadcast';

export interface TypeBroadcastDatabaseClientDisposeJobData {
  clientName?: keyof IDatabaseClientRecord;
}

@Broadcast()
export class BroadcastDatabaseClientDispose
  extends BeanBroadcastBase<TypeBroadcastDatabaseClientDisposeJobData>
  implements IBroadcastExecute<TypeBroadcastDatabaseClientDisposeJobData> {
  async execute(data: TypeBroadcastDatabaseClientDisposeJobData, isEmitter?: boolean) {
    const { clientName } = data;
    if (!isEmitter) {
      await cast(this.scope.service.database).disposeClientsRaw(clientName);
    }
  }
}
