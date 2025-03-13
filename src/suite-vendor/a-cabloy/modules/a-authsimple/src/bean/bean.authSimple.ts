import type { PowerPartial } from 'vona';
import type { EntityAuth, IAuthProviderClientRecord } from 'vona-module-a-auth';
import type { TableIdentity } from 'vona-module-a-database';
import type { IAuthProviderSimpleClientOptions, IAuthProviderSimpleClientRecord } from './authProvider.simple.ts';
import { BeanBase } from 'vona';
import { Bean } from 'vona-module-a-bean';

@Bean()
export class BeanAuthSimple extends BeanBase {
  async authenticate(clientOptions?: PowerPartial<IAuthProviderSimpleClientOptions>, clientName?: keyof IAuthProviderSimpleClientRecord) {
    return await this.bean.auth.authenticate('a-authsimple:simple', { clientName, clientOptions });
  }

  async add(userId: TableIdentity, password: string, clientName?: keyof IAuthProviderClientRecord): Promise<EntityAuth> {
    // add authsimple
    const authSimple = await this.scope.service.authSimple.add(userId, password);
    // auth provider
    const authProvider = await this.app.bean.authProvider.getByOnionName('a-authsimple:simple', clientName);
    // auth
    const profileId = authSimple.id;
    return await this.$scope.auth.model.auth.insert({
      userId,
      authProviderId: authProvider.id,
      profileId,
      profile: JSON.stringify({
        id: profileId,
      }),
    });
  }
}
