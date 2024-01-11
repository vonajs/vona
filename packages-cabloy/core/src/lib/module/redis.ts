import Bottleneck from 'bottleneck';
import Redlock from 'redlock';
import { CabloyApplication } from '../../types/index.js';

export default function (app: CabloyApplication) {
  const limiter = {
    // https://github.com/SGrondin/bottleneck#clustering
    create(options) {
      options = options || {};
      // datastore
      options.datastore = 'ioredis';
      // connection
      if (options.connection === undefined) {
        options.connection = new Bottleneck.IORedisConnection({
          client: app.redis.get('limiter'),
        });
      }
      return new Bottleneck(options);
    },
  };

  const redlock = {
    // https://github.com/mike-marcacci/node-redlock#configuration
    create(options) {
      // clients
      const clients = [] as any;
      for (const clientName of app.config.queue.redlock.clients) {
        const client = app.redis.get(clientName) || app.redis.get('limiter');
        clients.push(client);
      }
      return new Redlock(clients, options);
    },
  };

  // limiter
  app.meta.limiter = limiter;
  // redlock
  app.meta.redlock = redlock;
}
