import utils from '../../../common/utils.js';
import { BeanBase } from 'vona';

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
    const instances = await this.app.bean.instance.list();
    for (const instance of instances) {
      await this.bean.executor.newCtx(
        async () => {
          await this._update5AtomClassIdsInstance();
        },
        {
          subdomain: instance.name,
        },
      );
    }
  }

  async _update5AtomClassIdsInstance() {
    const atomClass = await utils.atomClass2(this.ctx, null);
    // update aCmsCategory's atomClassId
    await this.bean.model.update('aCmsCategory', {
      atomClassId: atomClass.id,
    });
    // update aCmsTag's atomClassId
    await this.bean.model.update('aCmsTag', {
      atomClassId: atomClass.id,
    });
  }
}
