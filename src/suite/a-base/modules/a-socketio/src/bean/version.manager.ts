import { BeanTemp } from 'vona-module-a-bean';
import { BeanBase } from 'vona';

@BeanTemp({ scene: 'version' })
export class VersionManager extends BeanBase {
  async update(options) {
    if (options.version === 3) {
      // aSocketIOMessageSync
      await this.bean.model.alterTable('aSocketIOMessageSync', function (table) {
        table.int0('messageClassId');
      });
    }

    if (options.version === 2) {
      // aSocketIOMessageClass
      await this.bean.model.alterTable('aSocketIOMessageClass', function (table) {
        table.int0('uniform');
      });
    }

    if (options.version === 1) {
      // create table: aSocketIOMessageClass
      await this.bean.model.createTable('aSocketIOMessageClass', function (table) {
        table.basicFields();
        table.string('module', 255);
        table.string('messageClassName', 255);
      });

      // create table: aSocketIOMessage
      await this.bean.model.createTable('aSocketIOMessage', function (table) {
        table.basicFields();
        table.int0('messageClassId');
        table.int0('messageType');
        table.string('messageFilter', 255);
        table.int0('messageGroup');
        table.string('messageScene', 50);
        table.int0('userIdTo');
        table.int0('userIdFrom');
        table.string('sessionId', 255);
        table.content();
      });

      // create table: aSocketIOMessageSync
      await this.bean.model.createTable('aSocketIOMessageSync', function (table) {
        table.basicFields();
        table.int0('messageId');
        table.int0('userId');
        table.int0('messageDirection');
        table.int0('messageRead');
      });

      // create view: aSocketIOMessageView
      await this.bean.model.createView('aSocketIOMessageView', view => {
        view.as(
          this.bean.model
            .builder('aSocketIOMessage as a')
            .select(['a.*', 'b.userId', 'b.messageDirection', 'b.messageRead', 'b.deleted as syncDeleted'])
            .leftJoin('aSocketIOMessageSync as b', { 'a.id': 'b.messageId' }),
        );
      });
    }
  }

  async init() {}

  async test() {}
}
