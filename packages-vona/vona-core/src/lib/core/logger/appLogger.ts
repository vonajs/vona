import type * as Transport from 'winston-transport';
import type { ILoggerClientChildRecord, ILoggerClientRecord, ILoggerOptionsClientInfo, LoggerLevel, TypeLoggerOptions } from '../../../types/interface/logger.ts';
import * as Winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { BeanSimple } from '../../bean/beanSimple.ts';
import { deepExtend } from '../../utils/util.ts';
import { formatLoggerConsole, formatLoggerFilter, getLoggerClientLevel, setLoggerClientLevel } from './utils.ts';

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

  child(childName?: keyof ILoggerClientChildRecord, clientName?: keyof ILoggerClientRecord) {
    const logger = this.get(clientName);
    if (!childName) return logger;
    return logger.child({ name: childName });
  }

  getLevel(clientName?: keyof ILoggerClientRecord): LoggerLevel | undefined {
    return getLoggerClientLevel(clientName);
  }

  setLevel(level: LoggerLevel | boolean, clientName?: keyof ILoggerClientRecord) {
    setLoggerClientLevel(level, clientName);
  }

  private _createClient(clientName: keyof ILoggerClientRecord): Winston.Logger {
    const configClient = this.app.config.logger.clients[clientName];
    if (!configClient) throw new Error(`logger client not found: ${clientName}`);
    const configNode = deepExtend(
      {},
      this._prepareConfigClient(clientName, this.app.config.logger.default),
      this._prepareConfigClient(clientName, configClient),
    );
    const logger = Winston.createLogger(configNode);
    logger.on('error', err => {
      console.error(err);
    });
    return logger;
  }

  private _prepareConfigClient(clientName: keyof ILoggerClientRecord, configClient: TypeLoggerOptions) {
    if (typeof configClient !== 'function') return configClient;
    return configClient.call(this.app, {
      clientName,
      level: () => getLoggerClientLevel(clientName),
    }, Winston);
  }

  public makeTransportFile(fileName: string, clientInfo: ILoggerOptionsClientInfo, levelStrict?: LoggerLevel) {
    return this.createTransportFile(fileName, clientInfo, {
      level: levelStrict ?? 'silly',
      format: Winston.format.combine(
        formatLoggerFilter({ level: levelStrict ?? clientInfo.level, strict: !!levelStrict }),
        Winston.format.json(),
      ),
    });
  }

  public makeTransportConsole(clientInfo: ILoggerOptionsClientInfo): Transport | undefined {
    if (this.app.meta.env.LOGGER_DUMMY === 'true') return;
    return new Winston.transports.Console({
      level: 'silly',
      format: Winston.format.combine(
        formatLoggerFilter({ level: clientInfo.level, silly: true }),
        Winston.format.colorize(),
        formatLoggerConsole(),
      ),
      forceConsole: true,
    });
  }

  public createTransportFile(
    fileName: string,
    clientInfo: ILoggerOptionsClientInfo,
    options: Winston.transports.FileTransportOptions | DailyRotateFile.DailyRotateFileTransportOptions,
  ) {
    const configRotate = this.app.config.logger.rotate;
    let optionsFile;
    if (configRotate.enable) {
      optionsFile = configRotate.options.call(this, fileName, Winston, clientInfo);
    } else {
      optionsFile = { filename: `${fileName}.log` };
    }
    const _options = deepExtend({ dirname: this.app.config.server.loggerDir }, optionsFile, options);
    if (configRotate.enable) {
      const transport = new DailyRotateFile(_options);
      transport.on('error', err => {
        console.error(err);
      });
      return transport;
    } else {
      return new Winston.transports.File(_options);
    }
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
