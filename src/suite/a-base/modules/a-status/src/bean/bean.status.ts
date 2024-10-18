import { ScopeModule, __ThisModule__ } from '../resource/this.js';
import { Bean, BeanModuleScopeBase } from 'vona';

@Bean()
export class BeanStatus extends BeanModuleScopeBase<ScopeModule> {
  get modelStatus() {
    return this.scope.model.status;
  }

  async get(name) {
    const status = await this.modelStatus.get({
      module: this.moduleScope,
      name,
    });
    return status ? JSON.parse(status.value) : undefined;
  }

  async set(name, value) {
    await this._set({ name, value, queue: true });
  }

  async _set({ name, value, queue }: any) {
    const status = await this.modelStatus.get({
      module: this.moduleScope,
      name,
    });
    if (status) {
      await this.modelStatus.update({
        id: status.id,
        value: JSON.stringify(value),
      });
    } else {
      if (queue) {
        await this.ctx.meta.util.lock({
          resource: `${__ThisModule__}.statusSet.${this.moduleScope}.${name}`,
          fn: async () => {
            return await this.ctx.meta.util.executeBeanIsolate({
              fn: async ({ ctx }) => {
                return await ctx.bean.status.module(this.moduleScope)._set({ name, value, queue: false });
              },
            });
          },
        });
      } else {
        await this.modelStatus.insert({
          module: this.moduleScope,
          name,
          value: JSON.stringify(value),
        });
      }
    }
  }
}
