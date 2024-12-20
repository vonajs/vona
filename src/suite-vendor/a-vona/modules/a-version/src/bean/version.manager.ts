import { BeanTemp } from 'vona-module-a-bean';
import { BeanBase } from 'vona';
import fse from 'fs-extra';

@BeanTemp({ scene: 'version' })
export class VersionManager extends BeanBase {
  async update(options) {
    if (options.version === 1) {
      // do nothing
    }

    if (options.version === 2) {
      await this.bean.model.createTable('aVersionInit', function (table) {
        table.basicFields({ deleted: false, iid: false });
        table.string('subdomain', 50);
        table.string('module', 50);
        table.integer('version');
      });
    }

    if (options.version === 3) {
      await this.bean.model.createTable('aViewRecord', function (table) {
        table.basicFields({ deleted: true, iid: false });
        table.string('viewName', 255);
        table.text('viewSql');
      });
    }
  }

  async init(options) {
    if (options.version === 1) {
      // remove publicDir
      await this._removePublicDir();
    }
  }

  async _removePublicDir() {
    // only for test/local env
    if (this.app.meta.isProd) return;
    // path
    const publicPath = await this.app.bean.base.getPath();
    // remove
    await fse.remove(publicPath);
  }
}
