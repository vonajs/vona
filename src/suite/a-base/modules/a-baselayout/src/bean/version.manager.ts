import { BeanTemp } from 'vona-module-a-bean';
import { __ThisModule__ } from '../.metadata/this.js';
import { BeanBase } from 'vona';

@BeanTemp({ scene: 'version' })
export class VersionManager extends BeanBase {
  get modelRoleRight() {
    return this.$scope.base.model.roleRight;
  }

  async update(options) {
    if (options.version === 1) {
      // create table: aLayout
      await this.bean.model.createTable('aLayout', function (table) {
        table.basicFields();
        table.atomId();
        table.description();
        table.int0('layoutTypeCode');
      });

      // create table:
      await this.bean.model.createTable('aLayoutContent', function (table) {
        table.basicFields();
        table.atomId();
        table.itemId();
        table.content();
      });

      // create view: aLayoutViewFull
      await this.bean.model.createView('aLayoutViewFull', view => {
        view.as(
          this.bean.model
            .builder('aLayout as a')
            .select(['a.*', 'b.content'])
            .leftJoin('aLayoutContent as b', { 'a.id': 'b.itemId' }),
        );
      });

      // update atomClassLayout
      await this._update_atomClassLayout();
    }
  }

  async init(options) {
    if (options.version === 1) {
      // check if exists
      const roleSystem = await this.app.bean.role.getSystemRole({ roleName: 'system' });
      const atomClassLayout = await this.app.bean.atomClass.get({
        module: __ThisModule__,
        atomClassName: 'layout',
      });
      const exists = await this.modelRoleRight.get({
        roleId: roleSystem!.id,
        atomClassId: atomClassLayout.id,
        action: 1,
      });
      if (!exists) {
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
        await this.app.bean.role.addRoleRightBatch({ module: __ThisModule__, atomClassName: 'layout', roleRights });
      }
    }
  }

  async _update_atomClassLayout() {
    // update atomClass from a-layoutpc to a-baselayout
    //   all iid
    await this.bean.model.builder('aAtomClass').update({ module: 'a-baselayout' }).where({
      module: 'a-layoutpc',
      atomClassName: 'layout',
    });
  }
}
