import Bottleneck from 'bottleneck';
import Redlock from 'redlock';
import { CabloyApplication } from '../../types/index.js';
import { BeanSimple } from '../bean/beanSimple.js';

export class AppLimiter extends BeanSimple {
  // https://github.com/SGrondin/bottleneck#clustering
  create(options) {
    options = options || {};
    // datastore
    options.datastore = 'ioredis';
    // connection
    if (options.connection === undefined) {
      options.connection = new Bottleneck.IORedisConnection({
        client: this.app.redis.get('limiter'),
      });
    }
    return new Bottleneck(options);
  }
}

export class AppRedlock extends BeanSimple {
  // https://github.com/mike-marcacci/node-redlock#configuration
  create(options) {
    // clients
    const clients = [] as any;
    for (const clientName of this.app.config.queue.redlock.clients) {
      const client = this.app.redis.get(clientName) || this.app.redis.get('limiter');
      clients.push(client);
    }
    return new Redlock(clients, options);
  }
}

export default function (app: CabloyApplication) {
  // limiter
  app.meta.limiter = app.bean._newBean(AppLimiter);
  // redlock
  app.meta.redlock = app.bean._newBean(AppRedlock);
}
