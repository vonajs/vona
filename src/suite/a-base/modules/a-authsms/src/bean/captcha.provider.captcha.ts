import { BeanTemp } from 'vona-module-a-bean';
import { __ThisModule__ } from '../.metadata/this.js';
import { BeanBase } from 'vona';

import chalk from 'chalk';
import * as Boxen from 'boxen';

const boxenOptions: Boxen.Options = {
  padding: 1,
  margin: 1,
  align: 'center',
  borderColor: 'yellow',
  borderStyle: 'round',
} as Boxen.Options;

@BeanTemp({ scene: 'captcha.provider' })
export class CaptchaProviderCaptcha extends BeanBase {
  async verify(_context) {
    const { providerInstanceId, context, data, dataInput } = _context;
    // sms provider
    const { provider, config } = this.__createSMSProvider();
    // verify
    await (<any>provider).verify({ providerInstanceId, context, data, dataInput, config });
  }

  __createSMSProvider(options?) {
    const providers = this.app.bean.smsProviderCache.getSmsProvidersConfigCache();
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
        const message = chalk.hex('#FF8800')(this.scope.locale.SMSProviderNonePrompt());
        console.log('\n' + Boxen.default(message, boxenOptions));
        this.scope.error.SMSProviderNonePrompt.throw();
      }
    }
    // provider
    const provider = this.app.bean._getBean(`${__ThisModule__}.sms.provider.${providerName}` as any);
    const config = providers[providerName];
    return { provider, config };
  }
}
