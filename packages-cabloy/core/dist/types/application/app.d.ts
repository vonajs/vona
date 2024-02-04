import { Application as EggApplication, EggLoaderOptions, Singleton } from 'egg';
import { EggPassport } from '@zhennann/egg-passport';
import { BeanContainerLike } from '../../lib/bean/beanContainer.js';
import { AppMeta } from '../../lib/core/meta.js';
import { Server as SocketServer } from 'socket.io';
import { Redis } from 'ioredis';
export * as IORedis from 'ioredis';
export interface CabloyApplication extends EggApplication {
    options: EggLoaderOptions;
    meta: AppMeta;
    bean: BeanContainerLike;
    redis: Singleton<Redis>;
    io: SocketServer;
    mysql: any;
    passport: EggPassport;
}
//# sourceMappingURL=app.d.ts.map