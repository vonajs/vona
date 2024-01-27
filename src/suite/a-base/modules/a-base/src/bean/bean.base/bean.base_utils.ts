import { __ThisModule__ } from '../../resource/this.js';
import { BeanBaseThemes } from './bean.base_themes.js';

import path from 'path';

import fse from 'fs-extra';

let _hostText: string | null = null;

export class BeanBaseUtils extends BeanBaseThemes {
  get host() {
    // test
    if (this.ctx.app.meta.isTest) {
      if (_hostText) return _hostText;
      const buildConfig = this.ctx.app.meta.util.requireDynamic(path.join(process.cwd(), 'build/config.js'));
      const hostname = buildConfig.front.dev.hostname || 'localhost';
      const port = buildConfig.front.dev.port;
      _hostText = `${hostname}:${port}`;
      return _hostText;
    }
    // others
    const config = this.ctx.config.module(__ThisModule__);
    return config.host || this.ctx.host;
  }

  get protocol() {
    const config = this.ctx.config.module(__ThisModule__);
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
      this.ctx.config.module(__ThisModule__).publicDir ||
      path.join(require('os').homedir(), 'cabloy', this.ctx.app.name, 'public');
    await fse.ensureDir(dir);
    return dir;
  }

  // get path
  async getPath(subdir, ensure) {
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
