import { LocalProcedureAtomRight } from './local.procedure_atomRight.js';

export class LocalProcedureAtomRightCheckRoleRightRead extends LocalProcedureAtomRight {
  async checkRoleRightAction({ iid, roleIdWho, atomClass, atomClassBase, atom, action, forAtomUser }: any) {
    // for safe
    iid = parseInt(iid);
    roleIdWho = parseInt(roleIdWho);
    action = parseInt(action);
    const atomId = this.app.bean.util.parseIdSafe(atom.id);
    // _where
    let _where;
    let _selectFields;
    let _tableAlias: string;
    if (!atomClassBase.itemOnly) {
      _where = {
        'a.deleted': 0,
        'a.iid': iid,
        'a.id': atomId,
        'a.atomStage': [1, 2],
        'a.atomClassId': atomClass.id,
      };
      _selectFields = ['a.*'];
      _tableAlias = 'aAtom as a';
    } else {
      _where = {
        'f.deleted': 0,
        'f.iid': iid,
        'f.id': atomId,
      };
      _selectFields = ['f.*'];
      _tableAlias = `${atomClassBase.tableName} as f`;
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
    _where.__and__right = _rightWhere;

    // builder
    const builder = this.bean.model.builder(_tableAlias);
    // select:fields
    builder.select(_selectFields);
    // where
    const wheres = this.bean.model.checkWhere(_where);
    if (wheres === false) return false;
    if (wheres === true) return true;
    this.bean.model.buildWhere(builder, wheres);
    // limit
    builder.limit(1);
    // execute
    const res = await builder;
    return res[0];
  }

  async _checkRoleRightAction_rightWhere({ iid, roleIdWho, atomClass, atomClassBase, action, forAtomUser, atom }: any) {
    // right
    return await this.self._prepareRightOfRole({
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
