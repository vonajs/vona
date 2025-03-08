import type { IPayloadData, IUserData } from '../types/user.ts';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';

@Service()
export class ServiceRedisToken extends BeanBase {
  private get redisAuth() {
    return this.bean.redis.get('auth');
  }

  async deserializeUser(payloadData: IPayloadData) {
    // check token
    const key = this._getAuthRedisKey(payloadData);
    if (!key) return null;
    const token = await this.redisAuth.get(key);
    if (token !== user.token) return null;
    // ready
    return user;
  }

  private _getAuthRedisKey(payloadData: IPayloadData) {
    const userAgent = user.agent || user.op;
    if (!this.ctx.instance || !user.provider || !userAgent) return null;
    return `authToken:${this.ctx.instance.id}:${userAgent.id}:${user.provider.scene || ''}:${user.provider.id}`;
  }

  _getAuthRedisKeyPattern({ user, keyPrefix }: any) {
    return `${keyPrefix}authToken:${this.ctx.instance.id}:${user.id}:*`;
  }
}
