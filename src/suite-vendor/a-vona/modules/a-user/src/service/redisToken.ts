import type { IPayloadDataBase } from 'vona-module-a-jwt';
import type { IUserBase } from 'vona-module-a-user';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-bean';

@Service()
export class ServiceRedisToken extends BeanBase {
  async verify(payloadData: IPayloadDataBase) {
    const payloadData2 = await this.retrieve(payloadData);
    if (!payloadData2) return false;
    if (this._getToken(payloadData2) !== this._getToken(payloadData)) return false;
    return true;
  }

  async retrieve(payloadData: IPayloadDataBase): Promise<IPayloadDataBase | undefined> {
    const key = this._getAuthRedisKey(payloadData);
    if (!key) return;
    const token = await this.redisAuth.get(key);
    if (!token) return;
    return { ...payloadData, [this.scope.config.payloadData.fields.token]: token };
  }

  async create(payloadData: IPayloadDataBase) {
    const key = this._getAuthRedisKey(payloadData);
    if (!key || !this._getToken(payloadData)) return this.app.throw(401);
    await this.redisAuth.set(key, this._getToken(payloadData), 'EX', this.scope.config.redisToken.maxAge);
  }

  async refresh(payloadData: IPayloadDataBase) {
    const key = this._getAuthRedisKey(payloadData);
    if (!key) return this.app.throw(401);
    await this.redisAuth.expire(key, this.scope.config.redisToken.maxAge);
  }

  async remove(payloadData: IPayloadDataBase) {
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

  private _getAuthRedisKey(payloadData: IPayloadDataBase) {
    if (!this.ctx.instance) return;
    return `authToken:${this.ctx.instance.id}:${this._getUserId(payloadData)}:${this._getAuthId(payloadData)}`;
  }

  private _getAuthRedisKeyPattern(user: IUserBase, keyPrefix: string | undefined) {
    return `${keyPrefix ?? ''}authToken:${this.ctx.instance.id}:${user.id}:*`;
  }

  private _getToken(payloadData: IPayloadDataBase) {
    return payloadData[this.scope.config.payloadData.fields.token];
  }

  private _getAuthId(payloadData: IPayloadDataBase) {
    return payloadData[this.scope.config.payloadData.fields.authId];
  }

  private _getUserId(payloadData: IPayloadDataBase) {
    return payloadData[this.scope.config.payloadData.fields.userId];
  }
}
