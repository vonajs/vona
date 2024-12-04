import { Knex } from 'knex';
import { LocalProcedureAtomRightCheckRightActionBulk } from './local.procedure_atomRight_checkRightActionBulk.js';
import { TableIdentity } from 'vona-module-a-database';

export class LocalProcedureResource extends LocalProcedureAtomRightCheckRightActionBulk {
  async checkRightResource({
    userIdWho,
    resourceAtomId,
  }): Promise<{ atomId: TableIdentity; atomName: string } | undefined> {
    const self = this;

    // for safe
    userIdWho = parseInt(userIdWho || 0);
    resourceAtomId = parseInt(resourceAtomId);

    // where
    const where: any = {
      'a.atomDisabled': 0,
      'a.atomStage': 1,
      'a.id': resourceAtomId,
    };
    // _rightWhere
    if (userIdWho) {
      where.__exists__ = function (this: Knex.QueryBuilder) {
        return this.select(['c.resourceAtomId'])
          .from('aViewUserRightResource as c')
          .where({
            'c.iid': self.bean.model.ref('a.iid'),
            'c.resourceAtomId': resourceAtomId,
            'c.userIdWho': userIdWho,
          });
      };
    }
    // sql
    let items = await this.bean.atom.model.select({
      alias: 'a',
      columns: ['a.id', 'a.atomName'],
      where,
      limit: 1,
    });
    items = items.map(item => {
      return {
        ...item,
        atomId: item.id,
      };
    });
    return items[0] as unknown as { atomId: TableIdentity; atomName: string } | undefined;
  }

  async _checkResourceLocales({ locale, atomClassIds }): Promise<{ atomId: number; atomName: string }[]> {
    const self = this;
    // sql
    const items = await this.bean.atom.model.select({
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
            })
            .whereNotNull('b.atomNameLocale')
            .where('b.atomNameLocale', '<>', '');
        },
      },
    });
    return items as unknown as { atomId: number; atomName: string }[];
  }
}
