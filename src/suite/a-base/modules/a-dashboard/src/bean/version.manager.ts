import { BeanTemp } from 'vona-module-a-bean';
import { BeanBase } from 'vona';
import { __ThisModule__ } from '../.metadata/this.js';

@BeanTemp({ scene: 'version' })
export class VersionManager extends BeanBase {
  async update(options) {
    if (options.version === 1) {
      // create table: aDashboardProfile
      await this.bean.model.createTable('aDashboardProfile', function (table) {
        table.basicFields();
        table.userId();
        table.string('profileName', 255);
        table.json('profileValue');
      });
    }

    if (options.version === 2) {
      // drop table: aDashboardProfile
      await this.bean.model.dropTable('aDashboardProfile');

      // create table: aDashboard
      await this.bean.model.createTable('aDashboard', function (table) {
        table.basicFields();
        table.atomId();
        table.description();
      });

      // create table: aDashboardContent
      await this.bean.model.createTable('aDashboardContent', function (table) {
        table.basicFields();
        table.atomId();
        table.itemId();
        table.content();
      });

      // create table: aDashboardUser
      await this.bean.model.createTable('aDashboardUser', function (table) {
        table.basicFields();
        table.userId();
        table.int0('dashboardDefault');
        table.int0('dashboardAtomId');
        table.string('dashboardName', 255);
        table.content();
      });

      // create view: aDashboardViewFull
      await this.bean.model.createView('aDashboardViewFull', view => {
        view.as(
          this.bean.model
            .builder('aDashboard as a')
            .select(['a.*', 'b.content'])
            .leftJoin('aDashboardContent as b', { 'a.id': 'b.itemId' }),
        );
      });
    }
  }

  async init(options) {
    if (options.version === 1) {
      // empty
    }

    if (options.version === 2) {
      // // add role rights
      // const roleRights = [
      //   { roleName: 'system', action: 'create' },
      //   { roleName: 'system', action: 'read', scopeNames: 0 },
      //   { roleName: 'system', action: 'read', scopeNames: 'superuser' },
      //   { roleName: 'system', action: 'write', scopeNames: 0 },
      //   { roleName: 'system', action: 'write', scopeNames: 'superuser' },
      //   { roleName: 'system', action: 'delete', scopeNames: 0 },
      //   { roleName: 'system', action: 'delete', scopeNames: 'superuser' },
      //   { roleName: 'system', action: 'clone', scopeNames: 0 },
      //   { roleName: 'system', action: 'clone', scopeNames: 'superuser' },
      //   { roleName: 'system', action: 'authorize', scopeNames: 0 },
      //   { roleName: 'system', action: 'authorize', scopeNames: 'superuser' },
      //   { roleName: 'system', action: 'deleteBulk' },
      //   { roleName: 'system', action: 'exportBulk' },
      // ];
      // await this.app.bean.role.addRoleRightBatch({ module: __ThisModule__, atomClassName: 'dashboard', roleRights });
    }

    if (options.version === 3) {
      // add role rights
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
      await this.app.bean.role.addRoleRightBatch({ module: __ThisModule__, atomClassName: 'dashboard', roleRights });
    }
  }

  async test() {}
}
