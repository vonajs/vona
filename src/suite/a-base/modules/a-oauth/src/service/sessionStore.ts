import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';

const ONE_DAY = 1000 * 60 * 60 * 24;

@Service()
export class ServiceSessionStore extends BeanBase {
  get redis() {
    return this.app.bean.redis.get('auth');
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
