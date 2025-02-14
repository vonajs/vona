import type { Application as EggApplication, EggLoaderOptions } from 'egg';
import type { BeanContainer } from '../../lib/bean/beanContainer.js';
import type { AppMeta } from '../../lib/core/meta.js';
import type { Server as SocketServer } from 'socket.io';
import type { VonaConfig } from '../config/config.js';
import type { VonaContext } from '../context/index.js';
import type { ApplicationError } from '../../lib/bean/resource/error/errorApplication.js';
import type { ApplicationText } from './appText.js';
import type { AppUtil } from '../../lib/utils/util.js';

// @ts-ignore ignore the throw type check of 'config'
export interface VonaApplication extends EggApplication, ApplicationError, ApplicationText {
  options: EggLoaderOptions & { flavor };
  util: AppUtil;
  meta: AppMeta;
  get ctx(): VonaContext;
  bean: BeanContainer;
  io: SocketServer;
  config: VonaConfig;
}
