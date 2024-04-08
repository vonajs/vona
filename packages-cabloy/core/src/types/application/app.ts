import { Application as EggApplication, EggLoaderOptions, Singleton } from 'egg';
import { EggPassport } from '@zhennann/egg-passport';
import { BeanContainerLike } from '../../lib/bean/beanContainer.js';
import { AppMeta } from '../../lib/core/meta.js';
import { Server as SocketServer } from 'socket.io';
import { Redis } from 'ioredis';
import { CabloyConfig } from '../config/config.js';
export * as IORedis from 'ioredis';

// @ts-ignore ignore the throw type check of 'config'
export interface CabloyApplication extends EggApplication {
  options: EggLoaderOptions;
  meta: AppMeta;
  bean: BeanContainerLike;
  redis: Singleton<Redis>; // Omit<Redis, 'get'> & Singleton<Redis>;
  io: SocketServer;
  mysql: any; // EggMySQL & Singleton<EggMySQL>;
  passport: EggPassport;
  config: CabloyConfig;
}
