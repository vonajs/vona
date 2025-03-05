import type { VonaAppInfo } from '../../types/application/app.ts';
import type { ConfigLogger } from '../../types/interface/logger.ts';
import type { VonaApplication } from './application.ts';
import { formatLoggerConsole, formatLoggerFilter } from './logger.ts';

export function combineLoggerDefault(_appInfo: VonaAppInfo) {
  const configDefault: ConfigLogger = {
    rotate: {
      enable: false,
      options(fileName) {
        return {
          filename: `${fileName}-%DATE%.log`,
          datePattern: 'YYYY-MM-DD',
          maxSize: '20m',
          maxFiles: '7d',
        };
      },
    },
    default(this: VonaApplication, { format, transports }, clientInfo) {
      return {
        format: format.combine(
          format.splat(),
          format.errors({ stack: true }),
          format.timestamp(),
        ),
        transports: [
          this.meta.logger.createTransportFile('error', clientInfo, {
            level: 'error',
            format: format.combine(
              format.json(),
            ),
          }),
          this.meta.logger.createTransportFile('http', clientInfo, {
            level: 'http',
            format: format.combine(
              formatLoggerFilter({ level: 'http', strict: true }),
              format.json(),
            ),
          }),
          this.meta.logger.createTransportFile('combined', clientInfo, {
            level: clientInfo.level,
            silent: clientInfo.level === undefined,
            format: format.combine(
              format.json(),
            ),
          }),
          new transports.Console({
            level: 'silly',
            silent: clientInfo.level === undefined,
            format: format.combine(
              formatLoggerFilter({ level: clientInfo.level, silly: true }),
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
