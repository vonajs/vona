import type { ILoggerClientRecord, LoggerLevel, Next, NextSync } from 'vona';
import type { IAopMethodExecute, IDecoratorAopMethodOptions } from 'vona-module-a-aspect';
import { BeanAopMethodBase, SymbolBeanFullName } from 'vona';
import { AopMethod } from 'vona-module-a-aspect';

export interface IAopMethodOptionsLog extends IDecoratorAopMethodOptions {
  level: LoggerLevel;
  clientName?: keyof ILoggerClientRecord;
}

@AopMethod<IAopMethodOptionsLog>({
  level: 'info',
})
export class AopMethodLog extends BeanAopMethodBase implements IAopMethodExecute {
  execute(options: IAopMethodOptionsLog, _args: [], next: Next | NextSync, receiver: any, prop: string): Promise<any> | any {
    const message = `${receiver[SymbolBeanFullName]}#${prop}`;
    const logger = this.app.meta.logger.get(options.clientName);
    // begin
    logger.log(options.level, `${message}\nargs: ${JSON.stringify(_args)}`);
    // next
    const res = next();
    if (res?.then) {
      return res.then((res: any) => {
        return this._logPass(logger, res, options, message);
      });
    }
    return this._logPass(options, message, res);
  }

  _logPass(logger: winston.Logger, res: any, options: IAopMethodOptionsLog, message: string) {
    logger.log(options.level, `${message}\nresult: ${JSON.stringify(res)}`);
  }
}
