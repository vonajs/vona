import type { VonaApplication } from 'vona';
import type { ConfigLogger } from '../types/logger.ts';

export function config(_app: VonaApplication) {
  const configDefault: ConfigLogger = {
    default: ({ format, transports }) => {
      return {
        level: 'silly',
        format: format.combine(format.timestamp()),
        transports: [
          new transports.File({ level: 'info', filename: 'error.log' }),
          new transports.Console({ level: 'silly', forceConsole: true }),
        ],
        silent: false,
      };
    },
    clients: {
      default: {},
    },
  };
  return configDefault;
}
