import { BeanBaseThemes } from './bean.base_themes.js';

import path from 'path';

import fse from 'fs-extra';

export class BeanBaseUtils extends BeanBaseThemes {
  get host() {
    const config = this.scope.config;
    return config.host || this.ctx.host;
  }

  get protocol() {
    const config = this.scope.config;
    return config.protocol || this.ctx.protocol;
  }

  getAbsoluteUrl(path) {
    const prefix = this.host ? `${this.protocol}://${this.host}` : '';
    return `${prefix}${path || ''}`;
  }

  // get forward url
  getForwardUrl(path) {
    const prefix = this.useAccelRedirect() ? '/public/' : this.ctx.app.config.static.prefix + 'public/';
    return `${prefix}${this.ctx.instance.id}/${path}`;
  }

  useAccelRedirect() {
    return this.ctx.app.meta.isProd && this.ctx.app.config.proxyProvider !== 'apache';
  }

  // get root path
  async getRootPath() {
    if (this.ctx.app.meta.isTest || this.ctx.app.meta.isLocal) {
      return this.ctx.app.config.static.dir;
    }
    const dir =
      this.scope.config.publicDir || path.join(require('os').homedir(), 'cabloy', this.ctx.app.name, 'public');
    await fse.ensureDir(dir);
    return dir;
  }

  // get path
  async getPath(subdir?, ensure?) {
    const rootPath = await this.getRootPath();
    // use instance.id, not subdomain
    const dir = path.join(rootPath, this.ctx.instance.id.toString(), subdir || '');
    if (ensure) {
      await fse.ensureDir(dir);
    }
    return dir;
  }

  // static
  getStaticUrl(path) {
    return this.getAbsoluteUrl(`/api/static${path}`);
  }

  // alert
  getAlertUrl({ data }: any) {
    return this.getAbsoluteUrl(`/#!/a/basefront/base/alert?data=${encodeURIComponent(JSON.stringify(data))}`);
  }
}
