import { Application as EggApplication, EggLoaderOptions, Singleton } from 'egg';
import { BeanContainer } from '../../lib/module/bean/beanContainer.js';
import { AppMeta } from '../../lib/module/meta.js';
import { Redis } from 'ioredis';
import { Server as SocketServer } from 'socket.io';

export interface CabloyApplication extends EggApplication {
  options: EggLoaderOptions;
  meta: AppMeta;
  bean: BeanContainer;
  redis: Singleton<Redis>;
  io: SocketServer;
}
