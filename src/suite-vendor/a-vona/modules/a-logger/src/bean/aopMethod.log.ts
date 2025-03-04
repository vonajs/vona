import type { ILoggerClientRecord, LoggerLevel, Next, NextSync } from 'vona';
import type { IAopMethodExecute, IDecoratorAopMethodOptions } from 'vona-module-a-aspect';
import type winston from 'winston';
import chalk from 'chalk';
import { BeanAopMethodBase, SymbolBeanFullName } from 'vona';
import { AopMethod } from 'vona-module-a-aspect';

export interface IAopMethodOptionsLog extends IDecoratorAopMethodOptions {
  level: LoggerLevel;
  clientName?: keyof ILoggerClientRecord;
  auto?: boolean;
  arguments?: boolean;
  result?: boolean;
}

@AopMethod<IAopMethodOptionsLog>({
  level: 'info',
})
export class AopMethodLog extends BeanAopMethodBase implements IAopMethodExecute {
  get(options: IAopMethodOptionsLog, next: NextSync, receiver: any, prop: string): string {
    const message = `${receiver[SymbolBeanFullName]}#get ${prop}`;
    const logger = this.app.meta.logger.get(options.clientName);
    // begin
    (!options.auto) && logger.log(options.level, message);
    const timeStart = Date.now();
    // next
    try {
      const res = next();
      this._logResult(logger, timeStart, res, options, message);
      return res;
    } catch (err: any) {
      this._logError(logger, timeStart, err, options, message);
      throw err;
    }
  }

  set(options: IAopMethodOptionsLog, value: string, next: NextSync, receiver: any, prop: string): boolean {
    const message = `${receiver[SymbolBeanFullName]}#set ${prop}`;
    const logger = this.app.meta.logger.get(options.clientName);
    // begin
    logger.log(options.level, `${message}\nvalue: ${JSON.stringify(value)}`);
    const timeStart = Date.now();
    // next
    try {
      const res = next();
      (!options.auto) && this._logResult(logger, timeStart, undefined, options, message);
      return res;
    } catch (err: any) {
      this._logError(logger, timeStart, err, options, message);
      throw err;
    }
  }

  execute(options: IAopMethodOptionsLog, _args: [], next: Next | NextSync, receiver: any, prop: string): Promise<any> | any {
    const message = `${receiver[SymbolBeanFullName]}#${prop}`;
    const logger = this.app.meta.logger.get(options.clientName);
    // begin
    options.arguments !== false && logger.log(options.level, `${message}\nargs: ${JSON.stringify(_args)}`);
    const timeStart = Date.now();
    // next
    try {
      const res = next();
      if (res?.then) {
        return res.then((res: any) => {
          options.result !== false && this._logResult(logger, timeStart, res, options, message);
          return res;
        }).catch((err: Error) => {
          this._logError(logger, timeStart, err, options, message);
          throw err;
        });
      }
      options.result !== false && this._logResult(logger, timeStart, res, options, message);
      return res;
    } catch (err: any) {
      this._logError(logger, timeStart, err, options, message);
      throw err;
    }
  }

  _logResult(logger: winston.Logger, timeStart: number, res: any, options: IAopMethodOptionsLog, message: string) {
    const durationMs = Date.now() - timeStart;
    const textDurationMs = ` ${chalk.cyan(`+${durationMs}ms`)}`;
    const textResult = res !== undefined ? `\nresult: ${JSON.stringify(res)}` : '';
    logger.log(options.level, `${message}${textDurationMs}${textResult}`);
  }

  _logError(logger: winston.Logger, timeStart: number, err: Error, _options: IAopMethodOptionsLog, message: string) {
    const durationMs = Date.now() - timeStart;
    const textDurationMs = ` ${chalk.cyan(`+${durationMs}ms`)}`;
    logger.log('error', `${message}${textDurationMs} ${err.toString()}`);
  }
}
