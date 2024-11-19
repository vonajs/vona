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
    return await this.app.bean.summer.get(
      { module: __ThisModule__, name: 'roleWhosOfAtomClassAction' },
      { atomClassId: atomClass.id, action },
    );
  }

  async clearSummer_roleWhosOfAtomClassAction() {
    await this.app.bean.summer.clear({ module: __ThisModule__, name: 'roleWhosOfAtomClassAction' });
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
