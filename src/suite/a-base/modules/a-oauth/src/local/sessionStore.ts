import { Local, BeanBase } from '@cabloy/core';

const ONE_DAY = 1000 * 60 * 60 * 24;

@Local()
export class LocalSessionStore extends BeanBase {
  _redis: any;

  constructor() {
    super();
    this._redis = null;
  }

  get redis() {
    if (!this._redis) {
      this._redis = this.app.redis.get('auth') || this.app.redis.get('cache');
    }
    return this._redis;
  }

  _getKeyToken({ ctx, token }: any) {
    return `${ctx.instance ? ctx.instance.id : 0}:${token}`;
  }

  async get(token, _maxAge, { ctx }) {
    const key = this._getKeyToken({ ctx, token });
    const value = await this.redis.get(key);
    return value ? JSON.parse(value) : undefined;
  }

  async set(token, value, maxAge, { ctx }) {
    const key = this._getKeyToken({ ctx, token });
    console.log(token, value, maxAge);
    value = JSON.stringify(value);
    maxAge = typeof maxAge === 'number' ? maxAge : ONE_DAY;
    await this.redis.set(key, value, 'PX', maxAge);
  }

  async destroy(token, { ctx }) {
    const key = this._getKeyToken({ ctx, token });
    await this.redis.del(key);
  }
}
