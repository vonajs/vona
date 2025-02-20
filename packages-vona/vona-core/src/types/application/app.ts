import type { Application as EggApplication, EggLoaderOptions } from 'egg';
import type { Server as SocketServer } from 'socket.io';
import type { BeanContainer } from '../../lib/bean/beanContainer.ts';
import type { ApplicationError } from '../../lib/bean/resource/error/errorApplication.ts';
import type { AppMeta } from '../../lib/core/meta.ts';
import type { AppUtil } from '../../lib/utils/util.ts';
import type { VonaConfig } from '../config/config.ts';
import type { VonaContext } from '../context/index.ts';
import type { ApplicationText } from './appText.ts';

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
