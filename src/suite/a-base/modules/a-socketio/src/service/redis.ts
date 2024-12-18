import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';

const __subVersion = 'sub3';
const __keyUserIndex = 2;

@Service()
export class ServiceRedis extends BeanBase {
  get redis() {
    return this.app.bean.redis.get('io');
  }

  // subcribe
  //    key: userId:path:socketId
  //    value: timestamp,workerId,scene
  async _subscribe({ path, timestamp, workerId, socketId, scene, user }: any) {
    if (!path) this.app.throw(403);
    scene = scene || '';
    const key = `${__subVersion}:${this.ctx.instance.id}:${user.id}:${path}`;
    const value = `${timestamp},${workerId},${scene}`;
    const debug = this.ctx.app.bean.debug.get('io');
    debug('subscribe: key:%s, value:%s, socket:%s', key, value, socketId);
    await this.redis.hset(key, socketId, value);
  }

  async _unsubscribe({ path, timestamp, socketId, user }: any) {
    if (!path) this.app.throw(403);
    const key = `${__subVersion}:${this.ctx.instance.id}:${user.id}:${path}`;
    // check timestamp
    const value = await this.redis.hget(key, socketId);
    if (!value) return;
    const parts = value.split(',');
    if (parseInt(parts[0]) > timestamp) return;
    // del
    await this.redis.hdel(key, socketId);
  }

  async _unsubscribeWhenDisconnect({ iid, user, socketId }: any) {
    const keyPrefix = this.redis.options.keyPrefix!;
    const keyPatern = `${keyPrefix}${__subVersion}:${iid}:${user.id}:*`;
    const keys = await this.redis.keys(keyPatern);
    const cmds: any[] = [];
    for (const fullKey of keys) {
      const key = fullKey.substr(keyPrefix.length);
      cmds.push(['hdel', key, socketId]);
    }
    // pipeline delete
    await this.redis.pipeline(cmds).exec();
  }

  async _getPathUsersOnline({ path }: any) {
    const userIds: any = {};
    const keyPrefix = this.redis.options.keyPrefix!;
    const keyPatern = `${keyPrefix}${__subVersion}:${this.ctx.instance.id}:*:${path}`;
    const keys = await this.redis.keys(keyPatern);
    for (const fullKey of keys) {
      const key = fullKey.substring(keyPrefix.length);
      userIds[key.split(':')[__keyUserIndex]] = true;
    }
    return Object.keys(userIds).map(item => parseInt(item));
  }

  async _getSubscribeValuesByPath({ userId, path }: any) {
    const result = await this._getSubscribeValuesByPathBatch({ userIds: [userId], path });
    return result[userId];
  }

  async _getSubscribeValuesByPathBatch({ userIds, path }: any) {
    const cmdsGetAll: any[] = [];
    for (const userId of userIds) {
      const key = `${__subVersion}:${this.ctx.instance.id}:${userId}:${path}`;
      cmdsGetAll.push(['hgetall', key]);
    }
    // pipeline
    const valuesBatch = (await this.redis.pipeline(cmdsGetAll).exec())!;
    // check
    const result: any = {};
    const workersStatus: any = {};
    const cmdsDelete: any[] = [];
    for (let i = 0; i < userIds.length; i++) {
      const userId = userIds[i];
      const hashValues = valuesBatch[i][1];
      const values = await this._subscribeValuesCheck({ userId, path, hashValues, workersStatus, cmdsDelete });
      result[userId] = values;
    }
    if (cmdsDelete.length > 0) {
      await this.redis.pipeline(cmdsDelete).exec();
    }
    // ok
    return result;
  }

  async _subscribeValuesCheck({ userId, path, hashValues, workersStatus, cmdsDelete }: any) {
    const values: any = {};
    for (const socketId in hashValues) {
      // in
      const value = hashValues[socketId];
      const [timestamp, workerId, scene] = value.split(',');
      // check if workerId valid
      let alive = workersStatus[workerId];
      if (alive === undefined) {
        alive = !!(await this.app.bean.worker.getAlive({ id: workerId }));
        workersStatus[workerId] = alive;
      }
      if (!alive) {
        // del
        const key = `${__subVersion}:${this.ctx.instance.id}:${userId}:${path}`;
        cmdsDelete.push(['hdel', key, socketId]);
      } else {
        // record
        values[socketId] = { timestamp, workerId, scene };
      }
    }
    if (Object.keys(values).length === 0) return null;
    return values;
  }
}
