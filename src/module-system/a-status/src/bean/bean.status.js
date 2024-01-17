const moduleInfo = module.info;
module.exports = class Status extends module.meta.class.BeanModuleBase {
  get modelStatus() {
    return this.ctx.model.module(moduleInfo.relativeName).status;
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

  async _set({ name, value, queue }) {
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
          resource: `${moduleInfo.relativeName}.statusSet.${this.moduleScope}.${name}`,
          fn: async () => {
            return await this.ctx.meta.util.executeBeanIsolate({
              beanModule: moduleInfo.relativeName,
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
};
