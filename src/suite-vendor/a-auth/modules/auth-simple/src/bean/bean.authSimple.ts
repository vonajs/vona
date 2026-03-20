import type { PowerPartial } from 'vona';
import type { TypeAuthenticateIntention } from 'vona-module-a-auth';

import { BeanBase } from 'vona';
import { Bean } from 'vona-module-a-bean';

import type { IAuthProviderSimpleClientOptions, IAuthProviderSimpleClientRecord } from './authProvider.simple.ts';

@Bean()
export class BeanAuthSimple extends BeanBase {
  async authenticate(
    clientOptions?: PowerPartial<IAuthProviderSimpleClientOptions>,
    intention?: TypeAuthenticateIntention,
    clientName?: keyof IAuthProviderSimpleClientRecord,
  ) {
    return await this.bean.auth.authenticate('auth-simple:simple', { clientName, clientOptions, state: { intention } });
  }
}
