import { Bean } from 'vona-module-a-bean';
import { __ThisModule__ } from '../.metadata/this.js';
import { BeanModuleScopeBase, Bean } from 'vona';

@Bean()
export class BeanCacheDb extends BeanModuleScopeBase {
  async get(name) {
    const res = await this._has(name);
    return res ? JSON.parse(res.value) : undefined;
  }

  async set(name, value, timeout?) {
    await this._set({ name, value, timeout, queue: true });
  }

  async getset(name, value, timeout?) {
    const res = await this._set({ name, value, timeout, queue: true });
    return res ? JSON.parse(res.value) : undefined;
  }

  async _set({ name, value, timeout, queue }: any) {
    // expired
    const expired = timeout ? new Date(Date.now() + parseInt(timeout)) : null;
    const res = await this.bean.model.get('aCache', {
      iid: this.ctx.instance ? this.ctx.instance.id : 0,
      module: this.moduleScope,
      name,
    });
    if (res) {
      await this.bean.model.update('aCache', {
        id: res.id,
        value: JSON.stringify(value),
        expired,
      });
    } else {
      if (queue) {
        await this.scope.redlock.lockIsolate(`cacheDbSet.${this.moduleScope}.${name}`, async () => {
          return await this.ctx.cache._db.module(this.moduleScope)._set({ name, value, timeout, queue: false });
        });
      } else {
        await this.bean.model.insert('aCache', {
          module: this.moduleScope,
          name,
          value: JSON.stringify(value),
          expired,
        });
      }
    }
    // return old value
    if (!res) return null;
    if (!res.expired || res.expired.getTime() > new Date().getTime()) return res;
    return null;
  }

  async has(name) {
    const res = await this._has(name);
    return !!res;
  }

  async _has(name) {
    const item = await this.bean.model.get('aCache', {
      module: this.moduleScope,
      name,
      __or__: [{ expired: { op: 'null' } }, { expired: { op: '>', val: new Date() } }],
    });
    return item;
  }

  async remove(name) {
    await this.bean.model.delete('aCache', {
      iid: this.ctx.instance ? this.ctx.instance.id : 0,
      module: this.moduleScope,
      name,
    });
  }

  async clear() {
    await this.bean.model.delete('aCache', {
      iid: this.ctx.instance ? this.ctx.instance.id : 0,
      module: this.moduleScope,
    });
  }
}
