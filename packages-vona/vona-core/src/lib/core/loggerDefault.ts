import type { VonaAppInfo } from '../../types/application/app.ts';
import type { ConfigLogger } from '../../types/interface/logger.ts';
import { formatLoggerConsole, formatLoggerFilter } from './logger.ts';

export function combineLoggerDefault(_appInfo: VonaAppInfo, loggerDir: string) {
  const configDefault: ConfigLogger = {
    default: ({ format, transports }, { level }) => {
      return {
        format: format.combine(
          format.splat(),
          format.errors({ stack: true }),
          format.timestamp(),
        ),
        transports: [
          new transports.File({
            level: 'error',
            filename: 'error.log',
            dirname: loggerDir,
            format: format.combine(
              format.json(),
            ),
          }),
          new transports.File({
            level: 'silly',
            filename: 'combined.log',
            dirname: loggerDir,
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
              formatLoggerConsole(),
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
