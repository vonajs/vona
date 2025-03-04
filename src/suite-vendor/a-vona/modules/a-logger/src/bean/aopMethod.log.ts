import type { ILoggerClientRecord, LoggerLevel, Next, NextSync } from 'vona';
import type { IAopMethodExecute, IDecoratorAopMethodOptions } from 'vona-module-a-aspect';
import type winston from 'winston';
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
    const profiler = logger.startTimer();
    // next
    const res = next();
    if (res?.then) {
      return res.then((res: any) => {
        this._logPass(profiler, res, options, message);
        return res;
      });
    }
    this._logPass(profiler, res, options, message);
    return res;
  }

  _logPass(profiler: winston.Profiler, res: any, options: IAopMethodOptionsLog, message: string) {
    profiler.done({ level: options.level, message: `${message}\nresult: ${JSON.stringify(res)}` });
  }
}
