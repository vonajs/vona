import { BeanBase, type PowerPartial } from 'vona';
import { Bean } from 'vona-module-a-bean';
import type { IAuthProviderSimpleClientOptions, IAuthProviderSimpleClientRecord } from './authProvider.simple.ts';

@Bean()
export class BeanAuthSimple extends BeanBase {
  async authenticate(clientOptions?:PowerPartial<IAuthProviderSimpleClientOptions>,clientName?:keyof IAuthProviderSimpleClientRecord) {
    return await this.bean.auth.authenticate('a-authsimple:simple',{ clientName, clientOptions })
  }
}
