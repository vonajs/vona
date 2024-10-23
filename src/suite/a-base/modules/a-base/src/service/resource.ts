import { BeanBase, Local } from 'vona';

@Local()
export class LocalResource extends BeanBase {
  async select({ atomClass, options, user }: any) {
    return await this.ctx.bean.resource.select({ atomClass, options, user });
  }

  async read({ atomStaticKey, options, user }: any) {
    return await this.ctx.bean.resource.readByStaticKey({ atomStaticKey, options, user });
  }

  async check({ atomStaticKeys, user }: any) {
    return await this.ctx.bean.resource.check({ atomStaticKeys, user });
  }

  async resourceRoles({ key, user }: any) {
    return await this.ctx.bean.resource.resourceRoles({ key, user });
  }

  async resourceRoleRemove({ key, data, user }: any) {
    return await this.ctx.bean.resource.deleteResourceRole({
      atomId: key.atomId,
      roleId: data.roleId,
      user,
    });
  }

  async resourceRoleAdd({ key, data, user }: any) {
    for (const roleId of data.roles) {
      await this.ctx.bean.resource.addResourceRole({ atomId: key.atomId, roleId, user });
    }
  }
}
