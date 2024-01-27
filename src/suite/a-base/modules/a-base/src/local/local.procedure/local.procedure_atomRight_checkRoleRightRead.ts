import { LocalProcedureAtomRight } from './local.procedure_atomRight.js';
import { LocalProcedureUtilsRights } from './local.procedure_utils_rights.js';

export class LocalProcedureAtomRightCheckRoleRightRead extends LocalProcedureAtomRight {
  async checkRoleRightAction({ iid, roleIdWho, atomClass, atomClassBase, atom, action, forAtomUser }: any) {
    // for safe
    iid = parseInt(iid);
    roleIdWho = parseInt(roleIdWho);
    action = parseInt(action);
    const atomId = this.ctx.bean.util.parseIdSafe(atom.id);
    // _where
    let _where;
    let _selectFields;
    let _atomJoin;
    if (!atomClassBase.itemOnly) {
      _where = {
        'a.deleted': 0,
        'a.iid': iid,
        'a.id': atomId,
        'a.atomStage': [1, 2],
        'a.atomClassId': atomClass.id,
      };
      _selectFields = 'a.*';
      _atomJoin = 'from aAtom a';
    } else {
      _where = {
        'f.deleted': 0,
        'f.iid': iid,
        'f.id': atomId,
      };
      _selectFields = 'f.*';
      _atomJoin = `from ${atomClassBase.tableName} f`;
    }
    // _rightWhere
    const _rightWhere = await this._checkRoleRightAction_rightWhere({
      iid,
      roleIdWho,
      atomClass,
      atomClassBase,
      action,
      forAtomUser,
      atom,
    });
    const _rightWhereClause = this.ctx.model._formatWhere(_rightWhere);
    if (_rightWhereClause === false) return false;
    if (_rightWhereClause === true) return true;
    _where.__and__right = _rightWhere;

    // where clause
    let _whereClause = this.ctx.model._formatWhere(_where);
    if (_whereClause === false) return false;
    if (_whereClause === true) return true;
    _whereClause = ` WHERE (${_whereClause})`;

    // sql
    const _sql = `select ${_selectFields} ${_atomJoin}
        ${_whereClause}
      `;
    return _sql;
  }

  async _checkRoleRightAction_rightWhere({ iid, roleIdWho, atomClass, atomClassBase, action, forAtomUser, atom }: any) {
    // right
    return await (this as unknown as LocalProcedureUtilsRights)._prepareRightOfRole({
      iid,
      atomClass,
      atomClassBase,
      action,
      roleIdWho,
      forAtomUser,
      role: undefined,
      atom,
    });
  }
}
