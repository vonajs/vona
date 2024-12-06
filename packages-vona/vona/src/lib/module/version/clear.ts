import path from 'path';
import fse from 'fs-extra';
import { VonaApplication } from '../../../types/index.js';

export default async function (app: VonaApplication) {
  if (!app.meta.isTest) return;
  // clear keys
  await _clearRedisKeys(app.redis.get('limiter'), `b_${app.name}:*`);
  await _clearRedisKeys(app.redis.get('queue'), `bull_${app.name}:*`);
  // broadcast channel has subscribed
  // await _clearRedisKeys(app.redis.get('broadcast'), `broadcast_${app.name}:*`);
  // redlock
  for (const clientName of app.config.queue.redlock.clients) {
    await _clearRedisKeys(app.redis.get(clientName), `redlock_${app.name}:*`);
  }
  for (const clientName in app.config.redis.clients) {
    if (['redlock', 'limiter', 'queue', 'broadcast'].includes(clientName)) continue;
    if (clientName.includes('redlock')) continue;
    const client = app.config.redis.clients[clientName];
    await _clearRedisKeys(app.redis.get(clientName), `${client.keyPrefix}*`);
  }
  // src/backend/app/public
  await fse.remove(path.join(app.options.baseDir, 'app/public/1'));
}

async function _clearRedisKeys(redis, pattern) {
  if (!redis) return;
  const keyPrefix = redis.options.keyPrefix;
  const keys = await redis.keys(pattern);
  const keysDel: string[] = [];
  for (const fullKey of keys) {
    const key = keyPrefix ? fullKey.substr(keyPrefix.length) : fullKey;
    keysDel.push(key);
  }
  if (keysDel.length > 0) {
    await redis.del(keysDel);
  }
}
