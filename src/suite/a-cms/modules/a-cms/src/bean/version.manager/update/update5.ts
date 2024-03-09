import utils from '../../../common/utils.js';
import { BeanBase } from '@cabloy/core';

export class VersionUpdate extends BeanBase {
  async run() {
    // alter table: aCmsCategory
    await this.bean.model.alterTable('aCmsCategory', function (table) {
      table.int0('atomClassId');
    });

    // alter table: aCmsTag
    await this.bean.model.alterTable('aCmsTag', function (table) {
      table.int0('atomClassId');
    });

    // atomClass
    await this._update5AtomClassIds();
  }

  async _update5AtomClassIds() {
    // all instances
    const instances = await this.ctx.bean.instance.list({ where: {} });
    for (const instance of instances) {
      await this.ctx.meta.util.executeBean({
        subdomain: instance.name,
        fn: async ({ ctx }) => {
          const selfInstance = ctx.bean._newBean(VersionUpdate);
          await selfInstance._update5AtomClassIdsInstance();
        },
      });
    }
  }

  async _update5AtomClassIdsInstance() {
    const atomClass = await utils.atomClass2(this.ctx, null);
    // update aCmsCategory's atomClassId
    await this.ctx.model.query(
      `update aCmsCategory set atomClassId=?
             where iid=?`,
      [atomClass.id, this.ctx.instance.id],
    );
    // update aCmsTag's atomClassId
    await this.ctx.model.query(
      `update aCmsTag set atomClassId=?
             where iid=?`,
      [atomClass.id, this.ctx.instance.id],
    );
  }
}
