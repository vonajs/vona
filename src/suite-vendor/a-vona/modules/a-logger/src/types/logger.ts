import type * as Winston from 'winston';

export type TypeLoggerOptions = Winston.LoggerOptions | ((winston: typeof Winston) => Winston.LoggerOptions);

export interface ILoggerClientRecord {
  default: never;
}

export interface ConfigLogger {
  default: TypeLoggerOptions;
  clients: Record<keyof ILoggerClientRecord, TypeLoggerOptions>;
}

declare module 'vona' {
  export interface BeanBase {
    get logger(): Winston.Logger;
  }
}
