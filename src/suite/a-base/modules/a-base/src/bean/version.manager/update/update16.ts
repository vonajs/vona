import { BeanBase } from 'vona';

export class VersionUpdate extends BeanBase {
  async run() {
    // aResource: add resourceIcon/appKey
    await this.bean.model.alterTable('aResource', function (table) {
      table.string('resourceIcon', 255);
      table.string('appKey', 50);
    });
    // create view: aResourceView
    await this.bean.model.createView('aResourceView', view => {
      view.as(
        this.bean.model
          .builder('aResource as a')
          .select(['a.*', 'b.id as appAtomId', 'b.atomName as appName'])
          .leftJoin('aAtom as b', {
            'a.iid': 'b.iid',
            'b.deleted': 0,
            'a.appKey': 'b.atomStaticKey',
            'b.atomStage': 1,
          }),
      );
    });
  }
}
