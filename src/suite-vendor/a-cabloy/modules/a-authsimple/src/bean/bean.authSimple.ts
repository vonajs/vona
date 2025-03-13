import type { PowerPartial } from 'vona';
import type { TableIdentity } from 'vona-module-a-database';
import type { IAuthProviderSimpleClientOptions, IAuthProviderSimpleClientRecord } from './authProvider.simple.ts';
import { BeanBase } from 'vona';
import { Bean } from 'vona-module-a-bean';

@Bean()
export class BeanAuthSimple extends BeanBase {
  async authenticate(clientOptions?: PowerPartial<IAuthProviderSimpleClientOptions>, clientName?: keyof IAuthProviderSimpleClientRecord) {
    return await this.bean.auth.authenticate('a-authsimple:simple', { clientName, clientOptions });
  }

  async add(userId: TableIdentity, password: string, clientName?: string) {
    // add authsimple
    const authSimpleId = await this.scope.service.authSimple.add(userId, password);
    // todo: 将authSimpleId作为profileId添加至aAuth表中
    // // auth
    // const providerItem = await this.app.bean.authProvider.getAuthProvider({
    //   module: __ThisModule__,
    //   providerName: 'authsimple',
    // });
    // await this.modelAuth.insert({
    //   userId,
    //   providerId: providerItem.id,
    //   profileId: authSimpleId,
    //   profile: JSON.stringify({
    //     authSimpleId,
    //     rememberMe: false,
    //   }),
    // });
    return authSimpleId;
  }
}
