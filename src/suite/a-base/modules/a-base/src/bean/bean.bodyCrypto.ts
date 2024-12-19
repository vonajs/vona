import { Bean } from 'vona-module-a-bean';
import { __ThisModule__ } from '../.metadata/this.js';
import { BeanBase, requireDynamic } from 'vona';

import path from 'path';

import * as ModuleInfo from '@cabloy/module-info';

let __bodyCryptoInstance = null;

@Bean()
export class BeanBodyCrypto extends BeanBase {
  get configModule() {
    return this.scope.config;
  }

  async ensureBodyCrypto() {
    if (!__bodyCryptoInstance) {
      const configCryptoJS = this.configModule.securityLevelProtection.body.cryptojs;
      const moduleInfo = ModuleInfo.parseInfo(configCryptoJS);
      if (!moduleInfo) throw new Error(`Invalid BodyCrypto JS: ${configCryptoJS}`);
      const _module = this.ctx.app.meta.modules[__ThisModule__];
      if (!_module) throw new Error(`Module Not Found: ${module}`);
      let jsFile = path.join(_module.root, 'static', configCryptoJS.substring(moduleInfo.url.length + 2));
      if (this.ctx.app.meta.isProd) {
        jsFile += '.min';
      }
      jsFile += '.js';
      const Loader = requireDynamic(jsFile);
      __bodyCryptoInstance = await Loader.createBodyCrypto();
    }
    return __bodyCryptoInstance;
  }

  async decrypt() {
    const body = this.ctx.request && this.ctx.request.body;
    if (!body || typeof body !== 'object' || !body.crypto) return;
    // ensure
    const bodyCryptoInstance = await this.ensureBodyCrypto();
    this.ctx.request.body = (<any>bodyCryptoInstance).decrypt(body);
  }

  async encrypt() {
    const configCrypto = this.configModule.securityLevelProtection.body.crypto;
    if (!configCrypto) return;
    if (this.ctx.ctxCaller) return;
    if (this.ctx.headers['x-open-auth-client']) return;
    const contentType = ((this.ctx.response.headers && this.ctx.response.headers['content-type']) as string) || '';
    if (!contentType || contentType.indexOf('application/json') === -1) return;
    const body = this.ctx.response && this.ctx.response.body;
    if (!body || typeof body !== 'object') return;
    // ensure
    const bodyCryptoInstance = await this.ensureBodyCrypto();
    this.ctx.response.body = (<any>bodyCryptoInstance).encrypt(body);
  }
}
