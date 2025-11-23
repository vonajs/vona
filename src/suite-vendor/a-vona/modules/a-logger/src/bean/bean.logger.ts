import type { ILoggerChildRecord, ILoggerClientRecord, ILoggerOptionsClientInfo, LoggerLevel } from 'vona';
import type * as Transport from 'winston-transport';
import { BeanBase, formatLoggerConsole, formatLoggerDummy, formatLoggerFilter } from 'vona';
import { Bean } from 'vona-module-a-bean';
import * as Winston from 'winston';

@Bean()
export class BeanLogger extends BeanBase {
  public getLevel(clientName?: keyof ILoggerClientRecord): LoggerLevel | false {
    return this.app.meta.logger.getLevel(clientName);
  }

  public setLevel(level: LoggerLevel | boolean, clientName?: keyof ILoggerClientRecord) {
    this.app.meta.logger.setLevel(level, clientName);
    this.scope.broadcast.setLevel.emit({ level, clientName });
  }

  public get default(): Winston.Logger {
    return this.app.meta.logger.get();
  }

  public get(clientName?: keyof ILoggerClientRecord): Winston.Logger {
    return this.app.meta.logger.get(clientName);
  }

  public getChild(childName: keyof ILoggerChildRecord, clientName?: keyof ILoggerClientRecord): Winston.Logger {
    return this.app.meta.logger.get(clientName).child({ name: childName });
  }

  public makeTransportFile(clientInfo: ILoggerOptionsClientInfo, fileName: string, levelStrict?: LoggerLevel): Transport {
    return this.app.meta.logger.createTransportFile(fileName, clientInfo, {
      level: levelStrict ?? 'silly',
      format: Winston.format.combine(
        formatLoggerFilter({ level: levelStrict ?? clientInfo.level, strict: !!levelStrict }),
        Winston.format.json(),
      ),
    });
  }

  public makeTransportConsole(clientInfo: ILoggerOptionsClientInfo): Transport {
    return new Winston.transports.Console({
      level: 'silly',
      format: Winston.format.combine(
        formatLoggerDummy(),
        formatLoggerFilter({ level: clientInfo.level, silly: true }),
        Winston.format.colorize(),
        formatLoggerConsole(clientInfo),
      ),
      forceConsole: true,
    });
  }
}
