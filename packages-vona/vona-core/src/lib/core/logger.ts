import type { ILoggerClientRecord, TypeLoggerOptions } from '../../types/interface/logger.ts';
import * as Winston from 'winston';
import { BeanSimple } from '../bean/beanSimple.ts';
import { deepExtend } from '../utils/util.ts';

const SymbolLoggerInstances = Symbol('SymbolLoggerInstances');

export class AppLogger extends BeanSimple {
  private [SymbolLoggerInstances]: Record<keyof ILoggerClientRecord, Winston.Logger> = {} as any;
  private _configDefault: TypeLoggerOptions;

  get(clientName?: keyof ILoggerClientRecord) {
    clientName = clientName || 'default';
    if (!this[SymbolLoggerInstances][clientName]) {
      this[SymbolLoggerInstances][clientName] = this._createClient(clientName);
    }
    return this[SymbolLoggerInstances][clientName];
  }

  private _createClient(clientName: keyof ILoggerClientRecord): Winston.Logger {
    const configLogger = this.app.config.logger;
    let configClient = configLogger.clients[clientName];
    if (!configClient) throw new Error(`logger client not found: ${clientName}`);
    if (typeof configClient === 'function') {
      configClient = configClient(Winston);
    }
    const configNode = deepExtend({}, this._getConfigDefault(), configClient);
    return Winston.createLogger(configNode);
  }

  private _getConfigDefault() {
    if (!this._configDefault) {
      let configDefault = this.app.config.logger.default;
      if (typeof configDefault === 'function') {
        configDefault = configDefault(Winston);
      }
      this._configDefault = configDefault;
    }
    return this._configDefault;
  }
}
