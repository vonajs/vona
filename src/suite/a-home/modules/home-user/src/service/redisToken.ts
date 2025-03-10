import type { IPayloadData } from '../types/passport.ts';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';

@Service()
export class ServiceRedisToken extends BeanBase {
  private get redisAuth() {
    return this.bean.redis.get('auth');
  }

  async verify(payloadData: IPayloadData) {
    const key = this._getAuthRedisKey(payloadData);
    if (!key) return false;
    const token = await this.redisAuth.get(key);
    if (token !== payloadData.token) return false;
    return true;
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

  private _getAuthRedisKey(payloadData: IPayloadData) {
    if (!this.ctx.instance) return;
    return `authToken:${this.ctx.instance.id}:${payloadData.userId}:${payloadData.authId}`;
  }

  _getAuthRedisKeyPattern({ user, keyPrefix }: any) {
    return `${keyPrefix}authToken:${this.ctx.instance.id}:${user.id}:*`;
  }
}
