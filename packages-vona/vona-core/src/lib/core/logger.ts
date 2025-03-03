import type { ILoggerClientRecord, TypeLoggerOptions } from '../../types/interface/logger.ts';
import * as Winston from 'winston';
import { BeanSimple } from '../bean/beanSimple.ts';
import { deepExtend } from '../utils/util.ts';

const SymbolLoggerInstances = Symbol('SymbolLoggerInstances');

export class AppLogger extends BeanSimple {
  private [SymbolLoggerInstances]: Record<keyof ILoggerClientRecord, Winston.Logger> = {} as any;

  get(clientName?: keyof ILoggerClientRecord) {
    clientName = clientName || 'default';
    if (!this[SymbolLoggerInstances][clientName]) {
      this[SymbolLoggerInstances][clientName] = this._createClient(clientName);
    }
    return this[SymbolLoggerInstances][clientName];
  }

  private _createClient(clientName: keyof ILoggerClientRecord): Winston.Logger {
    const configClient = this.app.config.logger.clients[clientName];
    if (!configClient) throw new Error(`logger client not found: ${clientName}`);
    const configNode = deepExtend(
      {},
      _prepareConfigClient(clientName, this.app.config.logger.default),
      _prepareConfigClient(clientName, configClient),
    );
    return Winston.createLogger(configNode);
  }
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
