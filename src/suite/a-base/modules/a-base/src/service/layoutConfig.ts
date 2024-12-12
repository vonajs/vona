import { BeanBase, Service } from 'vona';

@Service()
export class ServiceLayoutConfig extends BeanBase {
  async load({ module, user }: any) {
    const name = `user-layoutConfig:${module}:${user.id}` as const;
    return await this.scope.status.get(name);
  }

  async save({ module, data, user }: any) {
    const name = `user-layoutConfig:${module}:${user.id}` as const;
    await this.scope.status.set(name, data);
  }

  async saveKey({ module, key, value, user }: any) {
    const layoutConfig = await this.load({ module, user });
    const data = this.app.bean.util.extend({}, layoutConfig || {}, { [key]: value });
    await this.save({ module, data, user });
  }
}
