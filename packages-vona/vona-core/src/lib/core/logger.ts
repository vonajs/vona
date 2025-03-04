import type { ILoggerClientChildRecord, ILoggerClientRecord, TypeLoggerOptions } from '../../types/interface/logger.ts';
import { isEmptyObject } from '@cabloy/utils';
import * as Winston from 'winston';
import { BeanSimple } from '../bean/beanSimple.ts';
import { deepExtend } from '../utils/util.ts';

const SymbolLoggerInstances = Symbol('SymbolLoggerInstances');

export class AppLogger extends BeanSimple {
  private [SymbolLoggerInstances]: Record<keyof ILoggerClientRecord, Winston.Logger> = {} as any;

  public async dispose() {
    for (const key in this[SymbolLoggerInstances]) {
      const logger = this[SymbolLoggerInstances][key];
      await _closeLogger(logger);
    }
  }

  get(clientName?: keyof ILoggerClientRecord) {
    clientName = clientName || 'default';
    if (!this[SymbolLoggerInstances][clientName]) {
      this[SymbolLoggerInstances][clientName] = this._createClient(clientName);
    }
    return this[SymbolLoggerInstances][clientName];
  }

  child(childName: keyof ILoggerClientChildRecord, clientName?: keyof ILoggerClientRecord) {
    const logger = this.get(clientName);
    return logger.child({ name: childName });
  }

  private _createClient(clientName: keyof ILoggerClientRecord): Winston.Logger {
    const configClient = this.app.config.logger.clients[clientName];
    if (!configClient) throw new Error(`logger client not found: ${clientName}`);
    const configNode = deepExtend(
      {},
      _prepareConfigClient(clientName, this.app.config.logger.default),
      _prepareConfigClient(clientName, configClient),
    );
    const logger = Winston.createLogger(configNode);
    logger.on('error', err => {
      console.error(err);
    });
    return logger;
  }
}

async function _closeLogger(logger: Winston.Logger) {
  return new Promise(resolve => {
    if ((logger as any).__closed__) return resolve(true);
    logger.end(() => {
      (logger as any).__closed__ = true;
      resolve(true);
    });
  });
}

function _prepareConfigClient(clientName: keyof ILoggerClientRecord, configClient: TypeLoggerOptions) {
  if (typeof configClient !== 'function') return configClient;
  return configClient(Winston, {
    clientName,
    level: getLoggerClientLevel(clientName),
  });
}

export function getLoggerClientLevel(clientName: keyof ILoggerClientRecord): string | undefined {
  const envName = `LOGGER_CLIENT_${clientName.toUpperCase()}`;
  const level = process.env[envName];
  if (level === 'false') return;
  if (level === 'true' || !level) return 'info';
  return level;
}

export const formatLoggerFilter = Winston.format((info, opts: any) => {
  const level = opts.level;
  if (!level) return false;
  if (Winston.config.npm.levels[info.level] <= Winston.config.npm.levels[level] || (opts.silly && info.level === 'silly')) return info;
  return false;
});

export const formatLoggerConsole = () => {
  return Winston.format.printf(({ timestamp, level, stack, message, ...meta }) => {
    let text = `${timestamp} ${level} ${message}`;
    if (!isEmptyObject(meta)) {
      text = `${text} ${JSON.stringify(meta)}`;
    }
    if (stack) {
      text = `${text}\n${stack}`;
    }
    return text;
  });
};
