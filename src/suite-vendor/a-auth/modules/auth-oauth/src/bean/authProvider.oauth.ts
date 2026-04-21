import type { IAuthProviderClientRecord, IAuthProviderOauth2ClientOptions, IDecoratorAuthProviderOptions, StrategyBase } from 'vona-module-a-auth';

import { type Constructable } from 'vona';
import { AuthProvider, BeanAuthProviderOauth2Base } from 'vona-module-a-auth';

export interface IAuthProviderOauthClientRecord extends IAuthProviderClientRecord {
  github: never;
}

export interface IAuthProviderOauthClientOptions extends IAuthProviderOauth2ClientOptions {
  Strategy?: Constructable<StrategyBase>;
}

export interface IAuthProviderOptionsOauth extends IDecoratorAuthProviderOptions<IAuthProviderOauthClientRecord, IAuthProviderOauthClientOptions> {}

@AuthProvider<IAuthProviderOptionsOauth>({
  base: {
    confirmed: true,
    clientID: 'Shoule specify clientID',
    clientSecret: 'Shoule specify clientSecret',
  },
  clients: {
    github: {},
  },
})
export class AuthProviderOauth extends BeanAuthProviderOauth2Base {
  async strategy(clientOptions: IAuthProviderOauthClientOptions, _options: IAuthProviderOptionsOauth): Promise<Constructable<StrategyBase>> {
    if (!clientOptions.Strategy) throw new Error('Should specify Strategy for oauth provider');
    return clientOptions.Strategy;
  }
}
