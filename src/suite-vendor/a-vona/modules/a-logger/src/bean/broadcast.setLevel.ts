import type { ILoggerClientRecord, LoggerLevel } from 'vona';
import type { IBroadcastExecute } from 'vona-module-a-broadcast';
import { BeanBroadcastBase, Broadcast } from 'vona-module-a-broadcast';

export interface TypeBroadcastSetLevelJobData {
  level: LoggerLevel | boolean;
  clientName?: keyof ILoggerClientRecord;
}

@Broadcast()
export class BroadcastSetLevel
  extends BeanBroadcastBase<TypeBroadcastSetLevelJobData>
  implements IBroadcastExecute<TypeBroadcastSetLevelJobData> {
  async execute(data: TypeBroadcastSetLevelJobData, isEmitter?: boolean) {
    if (!isEmitter) {
      this.app.meta.logger.setLevel(data.level, data.clientName);
    }
  }
}
