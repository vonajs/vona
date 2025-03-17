import type { IJwtToken } from 'vona-module-a-jwt';
import type { IAuthUserProfile, IPassportBase, IUserBase } from 'vona-module-a-user';
import type { EntityAuthProvider } from '../entity/authProvider.ts';
import type { IAuthenticateOptions, IAuthenticateState } from '../types/auth.ts';
import type { IAuthProviderClientOptions, IAuthProviderRecord, IAuthProviderVerify } from '../types/authProvider.ts';
import { BeanBase, deepExtend } from 'vona';
import { Bean } from 'vona-module-a-bean';
import { TableIdentity } from 'vona-module-a-database';

@Bean()
export class BeanAuth extends BeanBase {
  async authenticate<T extends keyof IAuthProviderRecord>(
    authProviderName: T,
    options?: IAuthenticateOptions<IAuthProviderRecord[T]>,
  ): Promise<IJwtToken> {
    // clientName
    const clientName = options?.clientName ?? 'default';
    // onionSlice
    const onionSlice = this.bean.onion.authProvider.getOnionSliceEnabled(authProviderName);
    if (!onionSlice) throw new Error(`Auth provider not found: ${authProviderName}`);
    const onionOptions = onionSlice.beanOptions.options!;
    // authProvider
    const [module, providerName] = authProviderName.split(':');
    const entityAuthProvider = await this.bean.authProvider.get({ module, providerName, clientName });
    if (!entityAuthProvider || entityAuthProvider?.disabled) return this.app.throw(403);
    // clientOptions
    const optionsMeta = onionSlice.beanOptions.options;
    const clientOptions = deepExtend(
      {},
      optionsMeta?.default,
      optionsMeta?.clients?.[clientName as any],
      entityAuthProvider.clientOptions,
      options?.clientOptions,
    );
    // execute
    const beanAuthProvider = this.app.bean._getBean<IAuthProviderVerify>(onionSlice.beanOptions.beanFullName as any);
    // redirect
    if (!onionOptions.redirect) {

    }
  }
}
