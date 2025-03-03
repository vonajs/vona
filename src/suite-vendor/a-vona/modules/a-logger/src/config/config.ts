import type { VonaApplication } from 'vona';
import type { ConfigLogger } from '../types/logger.ts';
import path from 'node:path';

export function config(app: VonaApplication) {
  const loggerPath = app.config.server.loggerDir;
  const configDefault: ConfigLogger = {
    default: ({ format, transports }) => {
      return {
        level: 'silly',
        format: format.combine(format.timestamp(), format.json()),
        transports: [
          new transports.File({ level: 'error', filename: path.join(loggerPath, 'error.log') }),
          new transports.File({ level: 'silly', filename: path.join(loggerPath, 'combined.log') }),
          new transports.Console({
            format: format.combine(format.colorize(), format.simple()),
            forceConsole: true,
          }),
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
