import type * as Winston from 'winston';
import type DailyRotateFile from 'winston-daily-rotate-file';

export interface ILoggerOptionsClientInfo {
  clientName: keyof ILoggerClientRecord;
  level: () => (LoggerLevel | undefined);
}

export type TypeLoggerOptions = Winston.LoggerOptions | ((winston: typeof Winston, clientInfo: ILoggerOptionsClientInfo) => Winston.LoggerOptions);
export type TypeLoggerRotateOptions =
  (fileName: string, winston: typeof Winston, clientInfo: ILoggerOptionsClientInfo) => DailyRotateFile.DailyRotateFileTransportOptions;

export interface ILoggerClientRecord {
  default: never;
}

export interface ILoggerClientChildRecord {}

export interface ConfigLogger {
  default: TypeLoggerOptions;
  clients: Record<keyof ILoggerClientRecord, TypeLoggerOptions>;
  rotate: {
    enable: boolean;
    options: TypeLoggerRotateOptions;
  };
}

export type LoggerLevel = 'error' | 'warn' | 'info' | 'http' | 'verbose' | 'debug' | 'silly';
