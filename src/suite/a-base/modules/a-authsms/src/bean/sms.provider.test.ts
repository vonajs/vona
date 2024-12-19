import { BeanTemp } from 'vona-module-a-bean';
import { BeanBase } from 'vona';

import chalk from 'chalk';
import * as Boxen from 'boxen';

const boxenOptions = {
  padding: 1,
  margin: 1,
  align: 'center',
  borderColor: 'yellow',
  borderStyle: 'round',
} as Boxen.Options;

@BeanTemp({ scene: 'sms.provider' })
export class SmsProviderTest extends BeanBase {
  async sendCode({ context }: any) {
    // token
    const token = this.__prefix0(parseInt(Math.random() * 10000), 4);
    // prompt
    const message =
      chalk.cyan('Test SMS Verification Code To: ') + chalk.yellow(context.mobile) + chalk.hex('#FF8800')('\n' + token);
    console.log('\n' + Boxen.default(message, boxenOptions));
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
