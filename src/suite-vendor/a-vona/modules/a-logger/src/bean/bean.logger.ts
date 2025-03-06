import type { ILoggerClientRecord, LoggerLevel } from 'vona';
import { BeanBase } from 'vona';
import { Bean } from 'vona-module-a-bean';

@Bean()
export class BeanLogger extends BeanBase {
  getLevel(clientName?: keyof ILoggerClientRecord): LoggerLevel | undefined {
    return this.app.meta.logger.getLevel(clientName);
  }

  setLevel(level: LoggerLevel | boolean, clientName?: keyof ILoggerClientRecord) {
    this.app.meta.logger.setLevel(level, clientName);
    this.scope.broadcast.setLevel.emit({ level, clientName });
  }
}
