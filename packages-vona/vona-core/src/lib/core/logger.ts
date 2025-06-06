import type { ILoggerClientChildRecord, ILoggerClientRecord, ILoggerOptionsClientInfo, LoggerLevel, TypeLoggerOptions } from '../../types/interface/logger.ts';
import { isEmptyObject } from '@cabloy/utils';
import chalk from 'chalk';
import { LEVEL, MESSAGE } from 'triple-beam';
import * as Winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { cast } from '../../types/utils/cast.ts';
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
    return configClient.call(this.app, Winston, {
      clientName,
      level: () => getLoggerClientLevel(clientName),
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

export function getLoggerClientLevel(clientName?: keyof ILoggerClientRecord): LoggerLevel | undefined {
  clientName = clientName || 'default';
  const envName = `LOGGER_CLIENT_${clientName.toUpperCase()}`;
  const level = process.env[envName];
  if (level === 'false') return;
  if (level === 'true' || !level) return 'info';
  return level as LoggerLevel;
}

export function setLoggerClientLevel(level: LoggerLevel | boolean, clientName?: keyof ILoggerClientRecord) {
  clientName = clientName || 'default';
  const envName = `LOGGER_CLIENT_${clientName.toUpperCase()}`;
  process.env[envName] = level.toString();
}

export const formatLoggerAxiosError = Winston.format((einfo, { stack, cause }: any) => {
  if ((einfo instanceof Error && einfo.constructor.name.includes('AxiosError')) || einfo.name === 'AxiosError') {
    const info = Object.assign({}, einfo, {
      level: einfo.level,
      [LEVEL]: einfo[LEVEL] || einfo.level,
      message: einfo.message,
      [MESSAGE]: einfo[MESSAGE] || einfo.message,
    });
    if (stack) info.stack = einfo.stack;
    if (cause) info.cause = einfo.cause;
    info.message = `${info.message}: ${cast(info.config).url}`;
    info[MESSAGE] = `${info[MESSAGE]}: ${cast(info.config).url}`;
    delete info.config;
    delete info.request;
    delete info.response;
    return info;
  }
  return einfo;
});

export const formatLoggerFilter = Winston.format((info, opts: any) => {
  const level = typeof opts.level === 'function' ? opts.level() : opts.level;
  if (!level) return false;
  if (opts.strict) {
    if (Winston.config.npm.levels[info.level] === Winston.config.npm.levels[level]) return info;
    return false;
  }
  if (Winston.config.npm.levels[info.level] <= Winston.config.npm.levels[level] || (opts.silly && info.level === 'silly')) return info;
  return false;
});

export const formatLoggerConsole = () => {
  return Winston.format.printf(({ timestamp, level, stack, message, name, beanFullName, durationMs, ...meta }) => {
    const textName = name ? ` ${chalk.cyan(`[${name}]`)}` : '';
    const textBeanFullName = beanFullName ? ` ${chalk.gray(`[${beanFullName}]`)}` : '';
    const textMeta = !isEmptyObject(meta) ? ` ${JSON.stringify(meta)}` : '';
    const textMessage = ` ${message}`;
    const textDurationMs = durationMs !== undefined ? ` ${chalk.cyan(`+${durationMs}ms`)}` : '';
    const textStack = stack ? `\n${stack}` : '';
    return `${timestamp} ${level}${textName}${textBeanFullName}${textMeta}${textMessage}${textDurationMs}${textStack}`;
  });
};
