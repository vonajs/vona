import type { ILoggerClientRecord, LoggerLevel, Next, NextSync } from 'vona';
import type { IAopMethodExecute, IDecoratorAopMethodOptions } from 'vona-module-a-aspect';
import { BeanAopMethodBase } from 'vona';
import { AopMethod } from 'vona-module-a-aspect';

export interface IAopMethodOptionsLog extends IDecoratorAopMethodOptions {
  level: LoggerLevel;
  clientName: keyof ILoggerClientRecord;
}

@AopMethod<IAopMethodOptionsLog>()
export class AopMethodLog extends BeanAopMethodBase implements IAopMethodExecute {
  execute(_options: IAopMethodOptionsLog, _args: [], next: Next | NextSync, _receiver: any, _prop: string): Promise<any> | any {
    // next
    return next();
  }
}
