import { IModelSelectParamsJoin, Knex } from 'cabloy-module-api-a-database';
import { LocalProcedureAtomRightCheckRightAction } from './local.procedure_atomRight_checkRightAction.js';

export class LocalProcedureAtomRightCheckRightActionBulk extends LocalProcedureAtomRightCheckRightAction {
  async checkRightActionBulk({ iid, userIdWho, atomClass, atomClassBase, action }: any) {
    // for safe
    iid = parseInt(iid);
    userIdWho = parseInt(userIdWho);
    action = parseInt(action || 0);
    // fields
    const _selectFields = ['a.*', 'c.module', 'c.atomClassName'];
    // join
    const _tableAlias = 'aAtomAction as a';
    const _atomClassjoin: IModelSelectParamsJoin = ['leftJoin', 'aAtomClass as c', { 'a.atomClassId': 'c.id' }];
    // _where
    const _where: any = {
      'a.iid': iid,
      'a.bulk': 1,
      'a.atomClassId': atomClass.id,
    };
    // _actionWhere
    if (action) {
      _where['a.code'] = action;
    }
    // _rightWhere
    const _rightWhere = this._checkRightActionBulk_rightWhere({ iid, userIdWho, atomClassBase });
    _where.__and__right = _rightWhere;

    // builder
    const builder = this.bean.model.builder(_tableAlias);
    // select:fields
    builder.select(_selectFields);
    // join
    this.bean.model.buildJoin(builder, _atomClassjoin);
    // where
    const wheres = this.bean.model.checkWhere(_where);
    this.bean.model.buildWhere(builder, wheres);
    // limit
    if (action) {
      builder.limit(1);
    }
    // execute
    const debug = this.app.bean.debug.get('atom:right');
    if (debug.enabled) {
      debug('===== checkRightActionBulk =====\n%s', builder.toQuery());
    }
    const res = await builder;
    return action ? res[0] : res;
  }

  _checkRightActionBulk_rightWhere({ iid, userIdWho, atomClassBase }: any): any {
    const self = this;
    const enableRight = atomClassBase.enableRight;
    if (!enableRight) return true;
    return {
      __exists__user(this: Knex.QueryBuilder) {
        return this.select('b.atomClassId')
          .from('aViewUserRightAtomClass as b')
          .where({
            'b.iid': iid,
            'a.atomClassId': self.bean.model.ref('b.atomClassId'),
            'a.code': self.bean.model.ref('b.action'),
            'b.userIdWho': userIdWho,
          });
      },
    };
  }
}
