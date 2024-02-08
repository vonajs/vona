import { ScopeModule } from '../resource/this.js';
import { Bean, BeanBase } from '@cabloy/core';

import chalk from 'chalk';
import boxen from 'boxen';

const boxenOptions = {
  padding: 1,
  margin: 1,
  align: 'center',
  borderColor: 'yellow',
  borderStyle: 'round',
} as boxen.Options;

@Bean({ scene: 'sms.provider' })
export class SmsProviderTest extends BeanBase<ScopeModule> {
  async sendCode({ context }: any) {
    // token
    const token = this.__prefix0(parseInt(Math.random() * 10000), 4);
    // prompt
    const message =
      chalk.keyword('cyan')('Test SMS Verification Code To: ') +
      chalk.keyword('yellow')(context.mobile) +
      chalk.keyword('orange')('\n' + token);
    console.log('\n' + boxen(message, boxenOptions));
    // ok
    return { token };
  }

  async verify({ data, dataInput }: any) {
    if (!data) this.scope.error.SMSCodeInvalid.throw();
    if (data.token !== dataInput.token) this.scope.error.SMSCodeMismatch.throw();
  }

  __prefix0(num, length) {
    return (Array(length).join('0') + num).slice(-length);
  }
}
