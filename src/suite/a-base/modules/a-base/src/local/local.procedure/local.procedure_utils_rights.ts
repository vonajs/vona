import { LocalProcedureUtils } from './local.procedure_utils.js';
import { LocalProcedureUtilsFieldsRight } from './local.procedure_utils_fieldsRight.js';

export class LocalProcedureUtilsRights extends LocalProcedureUtilsFieldsRight {
  async _prepareRightMine({ /* iid, */ atomClass, atomClassBase, action, userIdWho, atom }: any) {
    // only mine data
    if (!atomClassBase) {
      return false; // not throw 403
    }
    // enableRight
    const enableRight = atomClassBase.enableRight;
    if (!enableRight) {
      // only mine
      if (!atomClassBase.itemOnly) {
        return __combineClauseRightMineAtom({ atom, userIdWho });
      }
      const userIdFieldName = atomClassBase.fields?.mappings?.userIdCreated;
      if (!userIdFieldName) return false;
      return __combineClauseRightMineItemOnly({ atom, userIdWho, userIdFieldName });
    }
    // mine
    const enableRightMine = enableRight.mine;
    if (!enableRightMine) return false;
    // roleScopesMine
    const roleScopesMine = await (this as unknown as LocalProcedureUtils)._prepare_roleScopesMineOfUser({
      atomClass,
      action,
      userIdWho,
    });
    // atom
    if (!atomClassBase.itemOnly) {
      return roleScopesMine ? __combineClauseRightMineAtom({ atom, userIdWho }) : false;
    }
    // itemOnly
    const userIdFieldName = atomClassBase.fields?.mappings?.userIdCreated;
    if (!userIdFieldName) {
      const error = `fields.mappings.userIdCreated should be set for: ${atomClass.module}:${atomClass.atomClassName}`;
      throw new Error(error);
    }
    return roleScopesMine ? __combineClauseRightMineItemOnly({ atom, userIdWho, userIdFieldName }) : false;
  }

  async _prepareRightOthers({ iid, atomClass, /* atomClassBase,*/ action, userIdWho, forAtomUser, role, atom }: any) {
    // others
    let _others;
    if (forAtomUser) {
      if (role) {
        // get users of role
        _others = this.ctx.model.raw(`
              exists(
                select c.userIdWhom from aViewUserRightAtomClassUser c
                  inner join aViewUserRoleRef c2 on c.userIdWhom=c2.userId and c2.roleIdParent=${role}
                  where c.iid=${iid} and a.itemId=c.userIdWhom and c.atomClassId=a.atomClassId and c.action=${action} and c.userIdWho=${userIdWho}
              )
            `);
      } else {
        _others = this.ctx.model.raw(`
              exists(
                select c.userIdWhom from aViewUserRightAtomClassUser c
                  where c.iid=${iid} and a.itemId=c.userIdWhom and c.atomClassId=a.atomClassId and c.action=${action} and c.userIdWho=${userIdWho}
              )
            `);
      }
    } else {
      const roleScopes = await (this as unknown as LocalProcedureUtils)._prepare_roleScopesOfUser({
        atomClass,
        action,
        userIdWho,
      });
      if (roleScopes === true) return true; // pass through
      if (roleScopes === false) {
        _others = false; // should check mine
      } else {
        _others = __combineClauseRightOthers({ atom, roleScopes });
      }
    }
    return _others;
  }

  async _prepareRight({ iid, atomClass, atomClassBase, action, userIdWho, forAtomUser, role, atom }: any) {
    // enableRight
    const enableRight = atomClassBase.enableRight;
    if (!enableRight) return true; // pass rights check
    // mine
    const _mine = await this._prepareRightMine({ iid, atomClass, atomClassBase, action, userIdWho, atom });
    // others
    const _others = await this._prepareRightOthers({
      iid,
      atomClass,
      atomClassBase,
      action,
      userIdWho,
      forAtomUser,
      role,
      atom,
    });
    // mine or others
    return { __or__: [_mine, _others] };
  }

  async _prepareRightOfRole({ iid, atomClass, atomClassBase, action, roleIdWho, forAtomUser, role, atom }: any) {
    // enableRight
    const enableRight = atomClassBase.enableRight;
    if (!enableRight) return true; // pass rights check
    // _others
    let _others;
    if (forAtomUser) {
      if (role) {
        // get users of role
        _others = this.ctx.model.raw(`
              exists(
                select c.userIdWhom from aViewRoleRightAtomClassUser c
                  inner join aViewUserRoleRef c2 on c.userIdWhom=c2.userId and c2.roleIdParent=${role}
                  where c.iid=${iid} and a.itemId=c.userIdWhom and c.atomClassId=a.atomClassId and c.action=${action} and c.roleIdWho=${roleIdWho}
              )
            `);
      } else {
        _others = this.ctx.model.raw(`
              exists(
                select c.userIdWhom from aViewRoleRightAtomClassUser c
                  where c.iid=${iid} and a.itemId=c.userIdWhom and c.atomClassId=a.atomClassId and c.action=${action} and c.roleIdWho=${roleIdWho}
              )
            `);
      }
    } else {
      const roleScopes = await (this as unknown as LocalProcedureUtils)._prepare_roleScopesOfRole({
        atomClass,
        action,
        roleIdWho,
      });
      if (roleScopes === true) return true; // pass through
      if (roleScopes === false) {
        _others = false;
      } else {
        _others = __combineClauseRightOthers({ atom, roleScopes });
      }
    }
    return _others;
  }
}

function __combineClauseRightMineAtom({ atom, userIdWho }) {
  if (atom) {
    return atom.userIdCreated === userIdWho;
  }
  return { 'a.userIdCreated': userIdWho };
}

function __combineClauseRightMineItemOnly({ atom, userIdWho, userIdFieldName }) {
  if (atom) {
    return atom[userIdFieldName] === userIdWho;
  }
  return { [`f.${userIdFieldName}`]: userIdWho };
}

function __combineClauseRightOthers({ atom, roleScopes }) {
  if (atom) {
    return roleScopes.includes(atom.roleIdOwner);
  }
  return { 'a.roleIdOwner': roleScopes };
}
