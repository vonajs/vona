import type { VonaApplication } from 'vona';
import type { ConfigLogger } from '../types/logger.ts';
import path from 'node:path';

export function config(app: VonaApplication) {
  const loggerPath = app.config.server.loggerDir;
  const configDefault: ConfigLogger = {
    default: ({ format, transports }) => {
      return {
        level: 'silly',
        format: format.combine(
          format.errors({ stack: true }),
          format.timestamp(),
        ),
        transports: [
          new transports.File({
            level: 'error',
            filename: path.join(loggerPath, 'error.log'),
            format: format.combine(format.json()),
          }),
          new transports.File({ level: 'silly', filename: path.join(loggerPath, 'combined.log') }),
          new transports.Console({
            format: format.combine(
              format.colorize(),
              format.printf(({ timestamp, level, stack, message }) => {
                return `${timestamp} ${level} ${stack || message}`;
              }),
            ),
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
