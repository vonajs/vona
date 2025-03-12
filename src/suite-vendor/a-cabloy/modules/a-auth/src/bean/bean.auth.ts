import type { PowerPartial } from 'vona';
import type { IAuthenticateOptions } from '../types/auth.ts';
import type { IAuthProviderRecord } from '../types/authProvider.ts';
import { BeanBase } from 'vona';
import { Bean } from 'vona-module-a-bean';

@Bean()
export class BeanAuth extends BeanBase {
  async authenticate<T extends keyof IAuthProviderRecord>(
    authProviderName: T,
    _options?: PowerPartial<IAuthenticateOptions<IAuthProviderRecord[T]>>,
  ) {
    const onionSlice = this.bean.onion.authProvider.getOnionSliceEnabled(authProviderName);
    if (!onionSlice) throw new Error(`Auth provider not found: ${authProviderName}`);
    const beanAuthProvider = await this.app.bean._getBean(onionSlice.beanOptions.beanFullName);
    console.log(onionSlice);
  }
}
