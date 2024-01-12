import { Application as EggApplication, EggLoaderOptions, Singleton } from 'egg';
import { BeanContainer } from '../../lib/module/bean/beanContainer.js';
import { AppMeta } from '../../lib/core/meta.js';
import { Redis } from 'ioredis';
import { Server as SocketServer } from 'socket.io';

export interface CabloyApplication extends EggApplication {
  options: EggLoaderOptions;
  meta: AppMeta;
  bean: BeanContainer;
  redis: Singleton<Redis>; // Omit<Redis, 'get'> & Singleton<Redis>;
  io: SocketServer;
  mysql: any; // EggMySQL & Singleton<EggMySQL>;
}
