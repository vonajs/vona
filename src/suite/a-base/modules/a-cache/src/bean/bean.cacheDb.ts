import { ScopeModule, __ThisModule__ } from '../resource/this.js';
import { BeanModuleScopeBase, Bean } from '@cabloy/core';

@Bean()
export class BeanCacheDb extends BeanModuleScopeBase<ScopeModule> {
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
    // second
    const second = timeout ? parseInt(timeout / 1000) : timeout;
    // expired
    const expired = second ? `TIMESTAMPADD(SECOND,${second},CURRENT_TIMESTAMP)` : 'null';
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
        await this.ctx.meta.util.lock({
          resource: `${__ThisModule__}.cacheDbSet.${this.moduleScope}.${name}`,
          fn: async () => {
            return await this.ctx.meta.util.executeBeanIsolate({
              fn: async ({ ctx }) => {
                return await ctx.cache._db.module(this.moduleScope)._set({ name, value, timeout, queue: false });
              },
            });
          },
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
      where: {
        module: this.moduleScope,
        name,
        __or__: [{ expired: { op: 'isNull' } }, { expired: { op: '>', val: new Date() } }],
      },
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
