import type { ILoggerClientRecord } from '../types/logger.ts';
import { BeanBase, deepExtend } from 'vona';
import { Service } from 'vona-module-a-web';
import * as Winston from 'winston';

@Service()
export class ServiceLoggerClient extends BeanBase {
  private _loggerInstance: Winston.Logger;

  get instance(): Winston.Logger {
    return this._loggerInstance;
  }

  protected __init__(clientName?: keyof ILoggerClientRecord) {
    // instance
    this._loggerInstance = this._createClient(clientName);
  }

  protected __dispose__() {
    // appClosed as preferred
    this._loggerInstance?.close();
  }

  private _createClient(clientName?: keyof ILoggerClientRecord): Winston.Logger {
    clientName = clientName || 'default';
    const configLogger = this.scope.config;
    let configClient = configLogger.clients[clientName];
    if (!configClient) throw new Error(`logger client not found: ${clientName}`);
    if (typeof configClient === 'function') {
      configClient = configClient(Winston);
    }
    let configDefault = configLogger.default;
    if (typeof configDefault === 'function') {
      configDefault = configDefault(Winston);
    }
    const configNode = deepExtend({}, configDefault, configClient);
    return Winston.createLogger(configNode);
  }
}
