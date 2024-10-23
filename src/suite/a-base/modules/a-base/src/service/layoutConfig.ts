import { BeanBase, Local } from 'vona';

@Local()
export class LocalLayoutConfig extends BeanBase {
  async load({ module, user }: any) {
    const name = `user-layoutConfig:${module}:${user.id}`;
    return await this.ctx.bean.status.get(name);
  }

  async save({ module, data, user }: any) {
    const name = `user-layoutConfig:${module}:${user.id}`;
    await this.ctx.bean.status.set(name, data);
  }

  async saveKey({ module, key, value, user }: any) {
    const layoutConfig = await this.load({ module, user });
    const data = this.ctx.bean.util.extend({}, layoutConfig || {}, { [key]: value });
    await this.save({ module, data, user });
  }
}
