import { BeanTemp } from 'vona-module-a-bean';
import { BeanBase } from 'vona';

@BeanTemp({ scene: 'version' })
export class VersionManager extends BeanBase {
  async update(options) {
    if (options.version === 1) {
      // create table: aFile
      await this.bean.model.createTable('aFile', function (table) {
        table.basicFields();
        table.userId();
        table.string('downloadId', 50);
        table.atomId();
        table.int0('mode');
        table.int0('fileSize');
        table.int0('width');
        table.int0('height');
        table.string('filePath', 255);
        table.string('fileName', 255);
        table.string('realName', 255);
        table.string('fileExt', 50);
        table.string('encoding', 50);
        table.string('mime', 50);
        table.int0('attachment');
        table.string('flag', 255);
      });

      // aViewFile
      await this.bean.model.createView('aViewFile', view => {
        view.as(
          this.bean.model
            .builder('aFile as a')
            .select(['a.*', 'b.userName', 'b.avatar'])
            .leftJoin('aUser as b', { 'a.userId': 'b.id' }),
        );
      });
    }

    if (options.version === 2) {
      // aFile: mime
      await this.bean.model.alterTable(
        'aFile',
        function (table) {
          table.string('mime', 255).alter();
        },
        true,
      );
    }
  }

  async init() {}

  async test() {}
}
