import type { VonaAppInfo } from '../../types/application/app.ts';
import type { ConfigLogger } from '../../types/interface/logger.ts';
import type { VonaApplication } from './application.ts';
import { formatLoggerConsole, formatLoggerFilter } from './logger.ts';

export function combineLoggerDefault(_appInfo: VonaAppInfo) {
  const configDefault: ConfigLogger = {
    rotate: {
      enable: true,
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
          this.meta.logger.createTransportFile('combined', clientInfo, {
            level: 'silly',
            format: format.combine(
              formatLoggerFilter({ level: clientInfo.level }),
              format.json(),
            ),
          }),
          new transports.Console({
            level: 'silly',
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
