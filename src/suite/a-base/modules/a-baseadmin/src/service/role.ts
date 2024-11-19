import { BeanBase, Service } from 'vona';

@Service()
export class ServiceRole extends BeanBase {
  async childrenTop({ roleTypes, page, user }: any) {
    return await this.app.bean.role.childrenTop({ roleTypes, page, user });
  }

  async children({ roleTypes, roleId, page, user }: any) {
    return await this.app.bean.role.children({ roleTypes, roleId, page, user });
  }

  async delete({ roleAtomId, user }: any) {
    await this.app.bean.role.delete({ roleAtomId, user });
    const progressId = await this._tailBuild();
    return { progressId };
  }

  async clone({ roleAtomId, user }: any) {
    const res = await this.app.bean.role.clone({ roleAtomId, user });
    const progressId = await this._tailBuild();
    return { ...res, progressId };
  }

  async move({ roleAtomId, roleIdParent, user }: any) {
    await this.app.bean.role.move({ roleAtomId, roleIdParent, user });
    const progressId = await this._tailBuild();
    return { progressId };
  }

  async addChild({ roleAtomId, user }: any) {
    const res = await this.app.bean.role.addChild({ roleAtomId, user });
    const progressId = await this._tailBuild();
    return { ...res, progressId };
  }

  async roleUsers({ roleAtomId, page, user }: any) {
    return await this.app.bean.role.roleUsers({ roleAtomId, page, user });
  }

  async addUserRole({ roleAtomId, userId, user }: any) {
    return await this.app.bean.role.addUserRole({ roleAtomId, userId, user });
  }

  async deleteUserRole({ roleAtomId, userId, user }: any) {
    return await this.app.bean.role.deleteUserRole({ roleAtomId, userId, user });
  }

  async includes({ roleAtomId, page, user }: any) {
    return await this.app.bean.role.includes({ roleAtomId, page, user });
  }

  async addRoleInc({ roleAtomId, roleIdInc, user }: any) {
    const id = await this.app.bean.role.addRoleInc({ roleAtomId, roleIdInc, user });
    const progressId = await this._tailBuild();
    return { id, progressId };
  }

  async removeRoleInc({ roleAtomId, roleIdInc, user }: any) {
    await this.app.bean.role.removeRoleInc({ roleAtomId, roleIdInc, user });
    const progressId = await this._tailBuild();
    return { progressId };
  }

  async _tailBuild() {
    const progressId = await this.app.bean.progress.create();
    // build, not await
    this.app.bean.role.build({ progressId });
    return progressId;
  }
}
