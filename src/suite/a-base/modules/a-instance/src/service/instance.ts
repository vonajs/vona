import { BeanBase, Service } from 'vona';
import { ScopeModule } from '../.metadata/this.js';

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
    await this.app.bean.instance.instanceChanged();
  }

  async getConfigsPreview() {
    let instance = await this.item();
    if (!instance) this.app.throw(403);
    instance = instance!;
    let configPreview = this.app.bean.util.extend({}, this.app.config.modules, JSON.parse(instance.config));
    configPreview = this.__configBlackFields(configPreview);
    return { data: configPreview };
  }

  async reload() {
    await this.app.bean.instance.reload();
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
