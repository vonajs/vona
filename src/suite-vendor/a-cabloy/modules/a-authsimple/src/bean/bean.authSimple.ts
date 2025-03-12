import type { PowerPartial } from 'vona';
import type { IAuthProviderSimpleClientOptions, IAuthProviderSimpleClientRecord } from './authProvider.simple.ts';
import { BeanBase } from 'vona';
import { Bean } from 'vona-module-a-bean';

@Bean()
export class BeanAuthSimple extends BeanBase {
  async authenticate(clientOptions?: PowerPartial<IAuthProviderSimpleClientOptions>, clientName?: keyof IAuthProviderSimpleClientRecord) {
    return await this.bean.auth.authenticate('a-authsimple:simple', { clientName, clientOptions });
  }
}
