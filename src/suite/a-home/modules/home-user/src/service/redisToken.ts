import type { IUserBase } from 'vona-module-a-user';
import type { IPayloadData } from '../types/passport.ts';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';

@Service()
export class ServiceRedisToken extends BeanBase {
  private get redisAuth() {
    return this.bean.redis.get('auth');
  }

  async verify(payloadData: IPayloadData) {
    const payloadData2 = await this.retrieve(payloadData);
    if (!payloadData2) return false;
    if (payloadData2.token !== payloadData.token) return false;
    return true;
  }

  async retrieve(payloadData: IPayloadData): Promise<IPayloadData | undefined> {
    const key = this._getAuthRedisKey(payloadData);
    if (!key) return;
    const token = await this.redisAuth.get(key);
    if (!token) return;
    return { ...payloadData, token };
  }

  async create(payloadData: IPayloadData) {
    const key = this._getAuthRedisKey(payloadData);
    if (!key || !payloadData.token) return this.app.throw(401);
    await this.redisAuth.set(key, payloadData.token, 'EX', this.scope.config.redisToken.maxAge);
  }

  async refresh(payloadData: IPayloadData) {
    const key = this._getAuthRedisKey(payloadData);
    if (!key) return this.app.throw(401);
    await this.redisAuth.expire(key, this.scope.config.redisToken.maxAge);
  }

  async remove(payloadData: IPayloadData) {
    const key = this._getAuthRedisKey(payloadData);
    if (!key) return;
    await this.redisAuth.del(key);
  }

  async removeAll(user: IUserBase) {
    const keyPrefix = this.redisAuth.options.keyPrefix;
    const keyPattern = this._getAuthRedisKeyPattern(user, keyPrefix);
    const keys = await this.redisAuth.keys(keyPattern);
    for (const fullKey of keys) {
      const key = keyPrefix ? fullKey.substring(keyPrefix.length) : fullKey;
      await this.redisAuth.del(key);
    }
  }

  private _getAuthRedisKey(payloadData: IPayloadData) {
    if (!this.ctx.instance) return;
    return `authToken:${this.ctx.instance.id}:${payloadData.userId}:${payloadData.authId}`;
  }

  private _getAuthRedisKeyPattern(user: IUserBase, keyPrefix: string | undefined) {
    return `${keyPrefix ?? ''}authToken:${this.ctx.instance.id}:${user.id}:*`;
  }
}
