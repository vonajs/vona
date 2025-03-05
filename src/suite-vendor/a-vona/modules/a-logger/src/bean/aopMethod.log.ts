import type { ILoggerClientChildRecord, ILoggerClientRecord, LoggerLevel, Next, NextSync } from 'vona';
import type { IAopMethodExecute, IDecoratorAopMethodOptions } from 'vona-module-a-aspect';
import type winston from 'winston';
import { BeanAopMethodBase, SymbolBeanFullName } from 'vona';
import { AopMethod } from 'vona-module-a-aspect';

export interface IAopMethodOptionsLog extends IDecoratorAopMethodOptions {
  level: LoggerLevel;
  childName?: keyof ILoggerClientChildRecord;
  clientName?: keyof ILoggerClientRecord;
  auto?: boolean;
  args?: boolean;
  result?: boolean;
  // context?:Record<
}

@AopMethod<IAopMethodOptionsLog>({
  level: 'info',
})
export class AopMethodLog extends BeanAopMethodBase implements IAopMethodExecute {
  get(options: IAopMethodOptionsLog, next: NextSync, receiver: any, prop: string): string {
    const message = `${receiver[SymbolBeanFullName]}#get ${prop}`;
    const logger = this.app.meta.logger.child(options.childName, options.clientName);
    // begin
    (!options.auto) && logger.log(options.level, message);
    const profiler = logger.startTimer();
    // next
    try {
      const res = next();
      this._logResult(profiler, res, options, message);
      return res;
    } catch (err: any) {
      this._logError(profiler, err, options, message);
      throw err;
    }
  }

  set(options: IAopMethodOptionsLog, value: string, next: NextSync, receiver: any, prop: string): boolean {
    const message = `${receiver[SymbolBeanFullName]}#set ${prop}`;
    const logger = this.app.meta.logger.child(options.childName, options.clientName);
    // begin
    logger.log(options.level, `${message} value: ${JSON.stringify(value)}`);
    const profiler = logger.startTimer();
    // next
    try {
      const res = next();
      (!options.auto) && this._logResult(profiler, undefined, options, message);
      return res;
    } catch (err: any) {
      this._logError(profiler, err, options, message);
      throw err;
    }
  }

  execute(options: IAopMethodOptionsLog, _args: [], next: Next | NextSync, receiver: any, prop: string): Promise<any> | any {
    const message = `${receiver[SymbolBeanFullName]}#${prop}`;
    const logger = this.app.meta.logger.child(options.childName, options.clientName);
    // begin
    options.args !== false && logger.log(options.level, `${message} args: ${JSON.stringify(_args)}`);
    const profiler = logger.startTimer();
    // next
    try {
      const res = next();
      if (res?.then) {
        return res.then((res: any) => {
          options.result !== false && this._logResult(profiler, res, options, message);
          return res;
        }).catch((err: Error) => {
          this._logError(profiler, err, options, message);
          throw err;
        });
      }
      options.result !== false && this._logResult(profiler, res, options, message);
      return res;
    } catch (err: any) {
      this._logError(profiler, err, options, message);
      throw err;
    }
  }

  _logResult(profiler: winston.Profiler, res: any, options: IAopMethodOptionsLog, message: string) {
    const textResult = res !== undefined ? ` result: ${JSON.stringify(res)}` : '';
    profiler.done({ level: options.level, message: `${message}${textResult}` });
  }

  _logError(profiler: winston.Profiler, err: Error, _options: IAopMethodOptionsLog, message: string) {
    const textError = ` error: ${err.message}`;
    profiler.done({ level: 'error', message: `${message}${textError}` });
  }
}
