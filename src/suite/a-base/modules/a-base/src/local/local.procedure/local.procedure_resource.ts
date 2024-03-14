import { Knex } from 'cabloy-module-api-a-database';
import { LocalProcedureAtomRightCheckRightActionBulk } from './local.procedure_atomRight_checkRightActionBulk.js';

export class LocalProcedureResource extends LocalProcedureAtomRightCheckRightActionBulk {
  checkRightResource({ iid, userIdWho, resourceAtomId }: any) {
    // for safe
    iid = parseInt(iid);
    userIdWho = parseInt(userIdWho || 0);
    resourceAtomId = parseInt(resourceAtomId);
    // _rightWhere
    let _rightWhere = '';
    if (userIdWho) {
      _rightWhere = `
          and (
            exists(select c.resourceAtomId from aViewUserRightResource c where c.iid=${iid} and c.resourceAtomId=${resourceAtomId} and c.userIdWho=${userIdWho})
              )
        `;
    }
    // sql
    const _sql = `select a.id as atomId,a.atomName from aAtom a
            where a.iid=${iid} and a.deleted=0 and a.atomDisabled=0 and a.atomStage=1 and a.id=${resourceAtomId}
              ${_rightWhere}
        `;
    return _sql;
  }

  async _checkResourceLocales({ locale, atomClassIds }: any) {
    const self = this;
    // sql
    const res = await this.bean.atom.model.select({
      alias: 'a',
      columns: ['a.id as atomId', 'a.atomName'],
      where: {
        'a.atomStage': 1,
        'a.atomClassId': atomClassIds,
        __notExists__(this: Knex.QueryBuilder) {
          return this.select(['b.id'])
            .from('aResourceLocale as b')
            .where({
              'b.iid': self.bean.model.ref('a.iid'),
              'b.atomId': self.bean.model.ref('a.id'),
              'b.locale': locale,
              __and__: [
                //
                { 'b.atomNameLocale': { op: 'notNull' } },
                { 'b.atomNameLocale': { op: '<>', val: '' } },
              ],
            });
        },
      },
    });
    return res;
  }
}
