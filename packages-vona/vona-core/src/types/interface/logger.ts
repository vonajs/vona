import type * as Winston from 'winston';
import type DailyRotateFile from 'winston-daily-rotate-file';

export interface ILoggerOptionsClientInfo {
  clientName: keyof ILoggerClientRecord;
  level: () => (LoggerLevel | undefined);
}

export type TypeLoggerOptions = Winston.LoggerOptions | ((clientInfo: ILoggerOptionsClientInfo, winston: typeof Winston) => Winston.LoggerOptions);
export type TypeLoggerRotateOptions =
  (fileName: string, winston: typeof Winston, clientInfo: ILoggerOptionsClientInfo) => DailyRotateFile.DailyRotateFileTransportOptions;

export interface ILoggerClientRecord {
  default: never;
}

export interface ILoggerChildRecord {}

export interface ILoggerRotateConfig {
  enable: boolean;
  options: TypeLoggerRotateOptions;
}

export interface ConfigLogger {
  base: TypeLoggerOptions;
  clients: Record<keyof ILoggerClientRecord, TypeLoggerOptions>;
  rotate: ILoggerRotateConfig;
}

export type LoggerLevel = 'error' | 'warn' | 'info' | 'http' | 'verbose' | 'debug' | 'silly';

declare module 'winston' {
  interface LogMethod {
    (level: string, message: () => string, ...meta: any[]): any;
  }

  interface LeveledLogMethod {
    (message: () => string, ...meta: any[]): any;
  }
}
