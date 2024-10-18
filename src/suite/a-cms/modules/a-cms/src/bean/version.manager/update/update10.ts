import { BeanBase } from 'vona';

export class VersionUpdate extends BeanBase {
  async run() {
    // alter table: aCmsArticle
    await this.bean.model.alterTable(
      'aCmsArticle',
      function (table) {
        table.string('imageCover', 255);
      },
      true,
    );
  }
}
