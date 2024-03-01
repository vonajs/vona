import { Bean, BeanBase } from '@cabloy/core';
import fse from 'fs-extra';

@Bean({ scene: 'version' })
export class VersionManager extends BeanBase {
  async update(options) {
    if (options.version === 1) {
      // do nothing
    }

    if (options.version === 2) {
      await this.bean.model.schema.createTable('aVersionInit', function (table) {
        table.basicFields({ deleted: false, iid: false });
        table.string('subdomain', 50);
        table.string('module', 50);
        table.integer('version');
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
    const publicPath = await this.ctx.bean.base.getPath();
    // remove
    await fse.remove(publicPath);
  }
}
