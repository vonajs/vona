import { BeanTemp } from 'vona-module-a-bean';
import { BeanBase } from 'vona';

@BeanTemp({ scene: 'version' })
export class VersionManager extends BeanBase {
  async update(options) {
    if (options.version === 1) {
      // create table: aAuthSimple
      await this.bean.model.createTable('aAuthSimple', function (table) {
        table.basicFields();
        table.userId();
        table.text('hash');
      });
    }
  }

  async init(options) {
    if (options.version === 1) {
      // root
      const userRoot = await this.app.bean.user.get({ userName: 'root' });
      await this.app.bean.authSimple.add({
        userId: userRoot!.id,
        password: options.password,
      });
      // admin
      const userAdmin = await this.app.bean.user.get({ userName: 'admin' });
      if (userAdmin) {
        await this.app.bean.authSimple.add({
          userId: userAdmin.id,
          password: '123456',
        });
      }
    }
  }

  async test() {}
}
