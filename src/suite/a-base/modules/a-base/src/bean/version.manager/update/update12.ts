import { BeanBase } from 'vona';

export class VersionUpdate extends BeanBase {
  async run(_options) {
    // aAtomClass: add atomClassInner
    await this.bean.model.alterTable('aAtomClass', function (table) {
      table.int0('atomClassInner');
    });

    // need not update atomClassInner: because it is deprecated
    // // update exists atomClasses
    // await this._updateAtomClasses(options);
  }

  // async _updateAtomClasses(options) {
  //   // all instances
  //   const instances = await this.app.bean.instance.list();
  //   for (const instance of instances) {
  //     await this.ctx.meta.util.executeBean({
  //       subdomain: instance.name,
  //       fn: async () => {
  //         await this._updateAtomClassesInstance();
  //       },
  //     });
  //   }
  // }

  // async _updateAtomClassesInstance() {
  //   // atomClasses
  //   const atomClasses = await this.bean.model.atomClass.select();
  //   for (const atomClass of atomClasses) {
  //     const _atomClass = this.app.bean.base.atomClass(atomClass);
  //     if (_atomClass.inner) {
  //       await this.bean.model.atomClass.update({ id: atomClass.id, atomClassInner: 1 });
  //     }
  //   }
  // }
}
