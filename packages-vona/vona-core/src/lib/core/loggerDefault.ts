import type { VonaAppInfo } from '../../types/application/app.ts';
import type { ConfigLogger } from '../../types/interface/logger.ts';
import path from 'node:path';
import { formatLoggerFilter } from './logger.ts';

export function combineLoggerDefault(_appInfo: VonaAppInfo, loggerDir: string) {
  const configDefault: ConfigLogger = {
    default: ({ format, transports }, { level }) => {
      return {
        format: format.combine(
          format.errors({ stack: true }),
          format.timestamp(),
        ),
        transports: [
          new transports.File({
            level: 'error',
            filename: path.join(loggerDir, 'error.log'),
            format: format.combine(
              format.json(),
            ),
          }),
          new transports.File({
            level: 'silly',
            filename: path.join(loggerDir, 'combined.log'),
            format: format.combine(
              formatLoggerFilter({ level }),
              format.json(),
            ),
          }),
          new transports.Console({
            level: 'silly',
            format: format.combine(
              formatLoggerFilter({ level, silly: true }),
              format.colorize(),
              format.printf(({ timestamp, level, stack, message }) => {
                return `${timestamp} ${level} ${stack || message}`;
              }),
            ),
            forceConsole: true,
          }),
        ],
      };
    },
    clients: {
      default: {},
    },
  };
  return configDefault;
}
