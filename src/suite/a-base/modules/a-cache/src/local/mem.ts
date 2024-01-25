import { BeanModuleScopeBase, Local } from '@cabloy/core';

const CACHEMEMORY = Symbol('APP#__CACHEMEMORY');

@Local()
export class LocalMem extends BeanModuleScopeBase {
  get memory() {
    if (!this.ctx.app[CACHEMEMORY]) {
      this.ctx.app[CACHEMEMORY] = {};
    }
    return this.ctx.bean.util.getPropertyObject(
      this.ctx.app[CACHEMEMORY],
      `${this.ctx.subdomain}&&${this.moduleScope}`,
      '&&',
    );
  }

  get(name) {
    const res = this.has(name);
    return res ? res.value : undefined;
  }

  set(name, value, timeout) {
    this.memory[name] = {
      value,
      timeout: timeout || 0,
      timestamp: new Date(),
    };
  }

  getset(name, value, timeout) {
    const valueOld = this.get(name);
    this.memory[name] = {
      value,
      timeout: timeout || 0,
      timestamp: new Date(),
    };
    return valueOld;
  }

  has(name) {
    const res = this.memory[name];
    if (!res) return null;
    return res.timeout === 0 || new Date() - res.timestamp < res.timeout ? res : null;
  }

  remove(name) {
    // remove this
    this._remove(name);
    // broadcast
    this.ctx.meta.util.broadcastEmit({
      module: 'a-cache',
      broadcastName: 'memRemove',
      data: { moduleName: this.moduleScope, name },
    });
  }

  // by broadcast
  _remove(name) {
    delete this.memory[name];
  }

  clear() {
    // clear this
    this._clear();
    // broadcast
    this.ctx.meta.util.broadcastEmit({
      module: 'a-cache',
      broadcastName: 'memClear',
      data: { moduleName: this.moduleScope },
    });
  }

  // by broadcast
  _clear() {
    if (
      this.ctx.app[CACHEMEMORY] &&
      this.ctx.app[CACHEMEMORY][this.ctx.subdomain] &&
      this.ctx.app[CACHEMEMORY][this.ctx.subdomain][this.moduleScope]
    ) {
      this.ctx.app[CACHEMEMORY][this.ctx.subdomain][this.moduleScope] = {};
    }
  }

  _clearAll() {
    if (this.ctx.app[CACHEMEMORY] && this.ctx.app[CACHEMEMORY][this.ctx.subdomain]) {
      const aInstance = this.ctx.app[CACHEMEMORY][this.ctx.subdomain]['a-instance'];
      this.ctx.app[CACHEMEMORY][this.ctx.subdomain] = { 'a-instance': aInstance };
    }
  }
}
