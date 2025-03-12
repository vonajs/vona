import type { TypeUseOnionOmitOptionsEnable } from 'vona-module-a-onion';
import type { IAuthProviderRecord } from '../types/authProvider.ts';
import { BeanBase } from 'vona';
import { Bean } from 'vona-module-a-bean';

@Bean()
export class BeanAuth extends BeanBase {
  async authenticate<T extends keyof IAuthProviderRecord>(
    _authProviderName: T,
    _options?: Partial<TypeUseOnionOmitOptionsEnable<IAuthProviderRecord[T]>>,
  ) {

  }
}
