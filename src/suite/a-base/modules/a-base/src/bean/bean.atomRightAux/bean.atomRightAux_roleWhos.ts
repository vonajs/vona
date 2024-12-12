import { __ThisModule__ } from '../../.metadata/this.js';
import { BeanAtomRightAuxRoleScopesMineOfUser } from './bean.atomRightAux_roleScopesMineOfUser.js';

export class BeanAtomRightAuxRoleWhos extends BeanAtomRightAuxRoleScopesMineOfUser {
  async getRoleWhosOfAtomClassAction({ atomClass, action }: any) {
    // atomClass
    atomClass = await this.app.bean.atomClass.get(atomClass);
    // action
    action = this.app.bean.atomAction.parseActionCode({
      action,
      atomClass,
    });
    // cache
    return await this.self.scope.summerCache.roleWhosOfAtomClassAction.get({ atomClassId: atomClass.id, action });
  }

  async clearSummer_roleWhosOfAtomClassAction() {
    await this.self.scope.summerCache.roleWhosOfAtomClassAction.clear();
  }

  async __getRoleWhosOfAtomClassActionRaw({ atomClassId, action }: any) {
    return await this.bean.model.select(
      'aViewRoleRightAtomClass',
      {
        distinct: true,
        columns: ['roleIdWho', 'scope'],
        where: {
          atomClassId,
          action,
        },
      },
      { disableDeleted: true },
    );
  }
}
