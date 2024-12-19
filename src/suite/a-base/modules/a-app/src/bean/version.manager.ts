import { BeanTemp } from 'vona-module-a-bean';
import { BeanBase } from 'vona';
import { __ThisModule__ } from '../.metadata/this.js';

@BeanTemp({ scene: 'version' })
export class VersionManager extends BeanBase {
  async update(options) {
    if (options.version === 1) {
      // create table: aApp
      await this.bean.model.createTable('aApp', function (table) {
        table.basicFields();
        table.atomId();
        table.description();
        table.int0('appSorting');
        table.string('appIcon', 255);
        table.int0('appIsolate');
        table.int0('appLanguage');
        table.int0('appCms');
      });

      // create table: aAppContent
      await this.bean.model.createTable('aAppContent', function (table) {
        table.basicFields();
        table.atomId();
        table.itemId();
        table.content();
      });

      // create view: aAppViewFull
      await this.bean.model.createView('aAppViewFull', view => {
        view.as(
          this.bean.model
            .builder('aApp as a')
            .select(['a.*', 'b.content'])
            .leftJoin('aAppContent as b', { 'a.id': 'b.itemId' }),
        );
      });
    }

    if (options.version === 2) {
      await this.bean.model.alterTable('aApp', function (table) {
        table.int0('appHidden');
      });

      // alter view: aAppViewFull
      await this.bean.model.alterView('aAppViewFull', view => {
        view.as(
          this.bean.model
            .builder('aApp as a')
            .select(['a.*', 'b.content'])
            .leftJoin('aAppContent as b', { 'a.id': 'b.itemId' }),
        );
      });
    }
  }

  async init(options) {
    if (options.version === 1) {
      // app: add role rights
      const roleRights = [
        { roleName: 'system', action: 'create' },
        { roleName: 'system', action: 'read', scopeNames: 0 },
        { roleName: 'system', action: 'read', scopeNames: 'authenticated' },
        { roleName: 'system', action: 'write', scopeNames: 0 },
        { roleName: 'system', action: 'write', scopeNames: 'authenticated' },
        { roleName: 'system', action: 'delete', scopeNames: 0 },
        { roleName: 'system', action: 'delete', scopeNames: 'authenticated' },
        { roleName: 'system', action: 'clone', scopeNames: 0 },
        { roleName: 'system', action: 'clone', scopeNames: 'authenticated' },
        { roleName: 'system', action: 'authorize', scopeNames: 0 },
        { roleName: 'system', action: 'authorize', scopeNames: 'authenticated' },
        { roleName: 'system', action: 'deleteBulk' },
        { roleName: 'system', action: 'exportBulk' },
      ];
      await this.app.bean.role.addRoleRightBatch({ module: __ThisModule__, atomClassName: 'app', roleRights });
    }
  }

  async test() {}
}
