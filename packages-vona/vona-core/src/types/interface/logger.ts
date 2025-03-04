import type * as Winston from 'winston';

export interface ILoggerOptionsClientInfo {
  clientName: keyof ILoggerClientRecord;
  level: string | undefined;
}

export type TypeLoggerOptions = Winston.LoggerOptions | ((winston: typeof Winston, clientInfo: ILoggerOptionsClientInfo) => Winston.LoggerOptions);

export interface ILoggerClientRecord {
  default: never;
}

export interface ILoggerClientChildRecord {}

export interface ConfigLogger {
  default: TypeLoggerOptions;
  clients: Record<keyof ILoggerClientRecord, TypeLoggerOptions>;
}
