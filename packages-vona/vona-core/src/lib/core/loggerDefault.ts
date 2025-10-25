import type { VonaAppInfo } from '../../types/application/app.ts';
import type { ConfigLogger } from '../../types/interface/logger.ts';
import type { VonaConfigEnv } from '../../types/utils/env.ts';
import type { VonaApplication } from './application.ts';
import { formatLoggerAxiosError, formatLoggerConsole, formatLoggerFilter } from './logger.ts';

export function combineLoggerDefault(_appInfo: VonaAppInfo, env: VonaConfigEnv) {
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
      const _transports = [
        this.meta.logger.createTransportFile('error', clientInfo, {
          level: 'error',
          format: format.combine(
            formatLoggerFilter({ level: 'error', strict: true }),
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
          level: 'silly',
          format: format.combine(
            formatLoggerFilter({ level: clientInfo.level }),
            format.json(),
          ),
        }),
      ];
      if (env.LOGGER_DUMMY !== 'true') {
        _transports.push(new transports.Console({
          level: 'silly',
          format: format.combine(
            formatLoggerFilter({ level: clientInfo.level, silly: true }),
            format.colorize(),
            formatLoggerConsole(),
          ),
          forceConsole: true,
        }) as any);
      }
      return {
        format: format.combine(
          formatLoggerAxiosError({ stack: true }),
          format.errors({ stack: true }),
          format.splat(),
          format.timestamp(),
        ),
        transports: _transports,
      };
    },
    clients: {
      default: {},
    },
  };
  return configDefault;
}
