import BeanAtomRightAuxRoleParentsOfUser from './bean.atomRightAux_roleParentsOfUser.js';

export class BeanAtomRightAuxUtils extends BeanAtomRightAuxRoleParentsOfUser {
  async clearSummersOfRole() {
    await this.clearSummer_roleScopesOfRole();
    await this.clearSummer_roleWhosOfAtomClassAction();
  }

  async clearSummersOfUser() {
    await this.clearSummer_roleScopesOfUser();
    await this.clearSummer_roleScopesMineOfUser();
    await this.clearSummer_roleParentsOfUser();
  }
}
