import { isEmptyObject } from '@cabloy/utils';
import chalk from 'chalk';
import { LEVEL, MESSAGE } from 'triple-beam';
import * as Winston from 'winston';
import { cast } from '../../../types/utils/cast.ts';

const SymbolLoggerMessage = Symbol('SymbolLoggerMessage');

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
    if (Winston.config.npm.levels[info.level] === Winston.config.npm.levels[level]) return __formatLoggerFilterCheckInfo(info);
    return false;
  }
  if (Winston.config.npm.levels[info.level] <= Winston.config.npm.levels[level] || (opts.silly && info.level === 'silly')) return __formatLoggerFilterCheckInfo(info);
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

function __formatLoggerFilterCheckInfo(info) {
  if (typeof info.message === 'function') {
    if (info.message[SymbolLoggerMessage] === undefined) {
      info.message[SymbolLoggerMessage] = info.message();
    }
    info.message = info.message[SymbolLoggerMessage];
  }
  return info;
}
