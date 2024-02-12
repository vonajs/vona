import { ScopeModule, __ThisModule__ } from '../resource/this.js';
import { Bean, BeanBase } from '@cabloy/core';

import chalk from 'chalk';
import boxen from 'boxen';

const boxenOptions: boxen.Options = {
  padding: 1,
  margin: 1,
  align: 'center',
  borderColor: 'yellow',
  borderStyle: 'round',
} as boxen.Options;

@Bean({ scene: 'captcha.provider' })
export class CaptchaProviderCaptcha extends BeanBase<ScopeModule> {
  async verify(_context) {
    const { providerInstanceId, context, data, dataInput } = _context;
    // sms provider
    const { provider, config } = this.__createSMSProvider();
    // verify
    await (<any>provider).verify({ providerInstanceId, context, data, dataInput, config });
  }

  __createSMSProvider(options?) {
    const providers = this.ctx.bean.smsProviderCache.getSmsProvidersConfigCache();
    // provider name
    let providerName = options && options.providerName;
    if (!providerName) {
      // current
      providerName = Object.keys(providers).find(providerName => providers[providerName].current);
      // test
      if (!providerName && (this.ctx.app.meta.isTest || this.ctx.app.meta.isLocal)) {
        providerName = 'test';
      }
      if (!providerName) {
        // prompt
        const message = chalk.keyword('orange')(this.scope.locale.SMSProviderNonePrompt());
        console.log('\n' + boxen(message, boxenOptions));
        this.scope.error.SMSProviderNonePrompt.throw();
      }
    }
    // provider
    const provider = this.ctx.bean._getBean(`${__ThisModule__}.sms.provider.${providerName}`);
    const config = providers[providerName];
    return { provider, config };
  }
}
