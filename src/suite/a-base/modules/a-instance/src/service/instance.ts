import { BeanBase, Service } from 'vona';
import { ScopeModule } from '../resource/this.js';

const __blackFields = ['startups', 'queues', 'broadcasts', 'middlewares', 'schedules'];

@Service()
export class ServiceInstance extends BeanBase<ScopeModule> {
  get modelInstance() {
    return this.scope.model.instance;
  }

  async item() {
    return await this.modelInstance.get({ id: this.ctx.instance.id });
  }

  async save({ data }: any) {
    // update
    await this.modelInstance.update({
      id: this.ctx.instance.id,
      title: data.title,
      config: JSON.stringify(this.__configBlackFields(data.config)),
    });
    // changed
    await this.ctx.bean.instance.instanceChanged();
  }

  async getConfigsPreview() {
    const instance = await this.item();
    if (!instance) this.ctx.throw(403);
    let configPreview = this.ctx.bean.util.extend({}, this.app.meta.configs, JSON.parse(instance.config));
    configPreview = this.__configBlackFields(configPreview);
    return { data: configPreview };
  }

  async reload() {
    await this.ctx.bean.instance.reload();
  }

  __configBlackFields(config) {
    if (typeof config === 'string') config = JSON.parse(config);
    for (const moduleName in config) {
      const moduleConfig = config[moduleName];
      for (const field of __blackFields) {
        delete moduleConfig[field];
      }
    }
    return config;
  }
}
