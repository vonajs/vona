import { LocalProcedureAtomRightCheckRoleRightRead } from './local.procedure_atomRight_checkRoleRightRead.js';

export class LocalProcedureAtomRightCheckRightAction extends LocalProcedureAtomRightCheckRoleRightRead {
  async checkRightAction({ iid, userIdWho, atomClass, atomClassBase, atom, action, forAtomUser }: any) {
    // for safe
    iid = parseInt(iid);
    userIdWho = parseInt(userIdWho);
    action = parseInt(action);
    const atomId = this.ctx.bean.util.parseIdSafe(atom.id);
    // _where
    let _where;
    let _selectFields;
    let _tableAlias: string;
    if (!atomClassBase.itemOnly) {
      _where = {
        'a.deleted': 0,
        'a.iid': iid,
        'a.id': atomId,
        // 'a.atomStage': [1, 2], viewWorkflow maybe in draft
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
    const _rightWhere = await this._checkRightAction_rightWhere({
      iid,
      userIdWho,
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

  async _checkRightAction_rightWhere({ iid, userIdWho, atomClass, atomClassBase, action, forAtomUser, atom }: any) {
    // right
    return await this.self._prepareRight({
      iid,
      atomClass,
      atomClassBase,
      action,
      userIdWho,
      forAtomUser,
      role: undefined,
      atom,
    });
  }
}
