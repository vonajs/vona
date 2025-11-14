import type { PowerPartial } from 'vona';
import type { VonaAppInfo } from '../../../types/application/app.ts';
import type { ConfigLogger } from '../../../types/interface/logger.ts';
import type { VonaConfigEnv } from '../../../types/utils/env.ts';
import type { VonaApplication } from '../application.ts';
import { replaceTemplate } from '@cabloy/utils';
import { formatLoggerAxiosError } from './utils.ts';

export function combineLoggerDefault(_appInfo: VonaAppInfo, env: VonaConfigEnv) {
  const configDefault: PowerPartial<ConfigLogger> = {
    rotate: {
      enable: env.LOGGER_ROTATE_ENABLE === 'true',
      options(filename) {
        return {
          filename: replaceTemplate(env.LOGGER_ROTATE_FILENAME!, { filename }),
          datePattern: env.LOGGER_ROTATE_DATEPATTERN,
          maxSize: env.LOGGER_ROTATE_MAXSIZE,
          maxFiles: env.LOGGER_ROTATE_MAXFILES,
        };
      },
    },
    default(this: VonaApplication, _clientInfo, { format }) {
      return {
        format: format.combine(
          formatLoggerAxiosError({ stack: true }),
          format.errors({ stack: true }),
          format.splat(),
          format.timestamp(),
        ),
        transports: undefined,
      };
    },
    clients: {
      default(this: VonaApplication, clientInfo) {
        const transports = [
          this.meta.logger.makeTransportFile('error', clientInfo, 'error'),
          this.meta.logger.makeTransportFile('warn', clientInfo, 'warn'),
          this.meta.logger.makeTransportFile('http', clientInfo, 'http'),
          this.meta.logger.makeTransportFile('combined', clientInfo),
          this.meta.logger.makeTransportConsole(clientInfo),
        ].filter(item => !!item);
        return { transports };
      },
    },
  };
  return configDefault;
}
