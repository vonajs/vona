import { __ThisModule__ } from '../resource/this.js';
import { BeanModuleScopeBase, Bean } from '@cabloy/core';

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
    // second
    const second = timeout ? parseInt(timeout / 1000) : timeout;
    // expired
    const expired = second ? `TIMESTAMPADD(SECOND,${second},CURRENT_TIMESTAMP)` : 'null';
    const res = await this.ctx.model.get('aCache', {
      iid: this.ctx.instance ? this.ctx.instance.id : 0,
      module: this.moduleScope,
      name,
    });
    if (res) {
      await this.ctx.model.query(
        `
          update aCache set value=?, expired=${expired}
            where id=?
          `,
        [JSON.stringify(value), res.id],
      );
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
        await this.ctx.model.query(
          `
            insert into aCache(iid,module,name,value,expired) values(?,?,?,?,${expired})
            `,
          [this.ctx.instance ? this.ctx.instance.id : 0, this.moduleScope, name, JSON.stringify(value)],
        );
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
    const sql =
      'select * from aCache where iid=? and module=? and name=? and (expired is null or expired>CURRENT_TIMESTAMP)';
    const res = await this.ctx.model.queryOne(sql, [
      this.ctx.instance ? this.ctx.instance.id : 0,
      this.moduleScope,
      name,
    ]);
    return res;
  }

  async remove(name) {
    await this.ctx.model.delete('aCache', {
      iid: this.ctx.instance ? this.ctx.instance.id : 0,
      module: this.moduleScope,
      name,
    });
  }

  async clear() {
    await this.ctx.model.delete('aCache', {
      iid: this.ctx.instance ? this.ctx.instance.id : 0,
      module: this.moduleScope,
    });
  }
}
