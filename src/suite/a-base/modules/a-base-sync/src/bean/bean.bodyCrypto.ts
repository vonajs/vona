import { Bean, BeanBase } from '@cabloy/core';

const path = require('path');

const mparse = require('@cabloy/module-parse').default;

let __bodyCryptoInstance = null;

@Bean()
export class BeanBodyCrypto extends BeanBase {
  get configModule() {
    return this.ctx.config.module(moduleInfo.relativeName);
  }

  async ensureBodyCrypto() {
    if (!__bodyCryptoInstance) {
      const configCryptoJS = this.configModule.securityLevelProtection.body.cryptojs;
      const moduleInfo = mparse.parseInfo(configCryptoJS);
      if (!moduleInfo) throw new Error(`Invalid BodyCrypto JS: ${configCryptoJS}`);
      const _module = this.ctx.app.meta.modules[moduleInfo.relativeName];
      if (!_module) throw new Error(`Module Not Found: ${module}`);
      let jsFile = path.join(_module.static.backend, configCryptoJS.substring(moduleInfo.url.length + 2));
      if (this.ctx.app.meta.isProd) {
        jsFile += '.min';
      }
      jsFile += '.js';
      const Loader = this.ctx.app.meta.util.requireDynamic(jsFile);
      __bodyCryptoInstance = await Loader.createBodyCrypto();
    }
    return __bodyCryptoInstance;
  }

  async decrypt() {
    const body = this.ctx.request && this.ctx.request.body;
    if (!body || typeof body !== 'object' || !body.crypto) return;
    // ensure
    const bodyCryptoInstance = await this.ensureBodyCrypto();
    this.ctx.request.body = bodyCryptoInstance.decrypt(body);
  }

  async encrypt() {
    const configCrypto = this.configModule.securityLevelProtection.body.crypto;
    if (!configCrypto) return;
    if (this.ctx.ctxCaller) return;
    if (this.ctx.headers['x-open-auth-client']) return;
    const contentType = this.ctx.response.headers && this.ctx.response.headers['content-type'];
    if (!contentType || contentType.indexOf('application/json') === -1) return;
    const body = this.ctx.response && this.ctx.response.body;
    if (!body || typeof body !== 'object') return;
    // ensure
    const bodyCryptoInstance = await this.ensureBodyCrypto();
    this.ctx.response.body = bodyCryptoInstance.encrypt(body);
  }
}
