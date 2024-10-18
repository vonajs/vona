import { BeanBase } from 'vona';

export class VersionInit extends BeanBase {
  async run(_options) {
    // add role:template to authenticated
    // add role:system to template
    const items = [
      {
        roleName: 'template',
        leader: 0,
        catalog: 1,
        system: 1,
        sorting: 0,
        roleIdParent: 'authenticated',
      },
      {
        roleName: 'system',
        leader: 0,
        catalog: 0,
        system: 1,
        sorting: 1,
        roleIdParent: 'template',
      },
    ];
    let needBuild = false;
    for (const item of items) {
      const role = await this.ctx.bean.role.getSystemRole({ roleName: item.roleName });
      if (!role) {
        needBuild = true;
        const roleParent = await this.ctx.bean.role.getSystemRole({ roleName: item.roleIdParent });
        const roleId = await this.ctx.bean.role.add({
          roleName: item.roleName,
          leader: item.leader,
          catalog: item.catalog,
          system: item.system,
          sorting: item.sorting,
          roleIdParent: roleParent!.id,
        });
        if (item.roleName === 'system') {
          // superuser include system
          const roleSuperuser = await this.ctx.bean.role.getSystemRole({ roleName: 'superuser' });
          await this.ctx.bean.role.addRoleInc({ roleId: roleSuperuser!.id, roleIdInc: roleId });
        }
      }
    }
    // build
    if (needBuild) {
      await this.ctx.bean.role.setDirty(true);
    }
  }
}
