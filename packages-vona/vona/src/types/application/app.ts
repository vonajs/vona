import { Application as EggApplication, EggLoaderOptions, Singleton } from 'egg';
import { EggPassport } from '@zhennann/egg-passport';
import { BeanContainer } from '../../lib/bean/beanContainer.js';
import { AppMeta } from '../../lib/core/meta.js';
import { Server as SocketServer } from 'socket.io';
import { Redis } from 'ioredis';
import { VonaConfig } from '../config/config.js';
import { VonaContext } from '../context/index.js';
import { ApplicationError } from '../../lib/bean/resource/error/errorApplication.js';
import { ApplicationText } from './appText.js';
export * as IORedis from 'ioredis';

// @ts-ignore ignore the throw type check of 'config'
export interface VonaApplication extends EggApplication, ApplicationError, ApplicationText {
  options: EggLoaderOptions & { flavor };
  meta: AppMeta;
  get ctx(): VonaContext;
  bean: BeanContainer;
  redis: Singleton<Redis>; // Omit<Redis, 'get'> & Singleton<Redis>;
  io: SocketServer;
  mysql: any; // EggMySQL & Singleton<EggMySQL>;
  passport: EggPassport;
  config: VonaConfig;
}
