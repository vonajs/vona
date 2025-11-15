import type { VonaAppInfo } from '../../../types/application/app.ts';
import type { ConfigLogger } from '../../../types/interface/logger.ts';
import type { VonaConfigEnv } from '../../../types/utils/env.ts';
import type { PowerPartial } from '../../../types/utils/powerPartial.ts';
import type { VonaApplication } from '../application.ts';
import { replaceTemplate } from '@cabloy/utils';
import { formatLoggerAxiosError, formatLoggerCtx } from './utils.ts';

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
    base(this: VonaApplication, _clientInfo, { format }) {
      return {
        format: format.combine(
          formatLoggerAxiosError({ stack: true }),
          formatLoggerCtx(),
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
          this.bean.logger.makeTransportFile(clientInfo, 'error', 'error'),
          this.bean.logger.makeTransportFile(clientInfo, 'warn', 'warn'),
          this.bean.logger.makeTransportFile(clientInfo, 'http', 'http'),
          this.bean.logger.makeTransportFile(clientInfo, 'combined'),
          this.bean.logger.makeTransportConsole(clientInfo),
        ].filter(item => !!item);
        return { transports };
      },
    },
  };
  return configDefault;
}
