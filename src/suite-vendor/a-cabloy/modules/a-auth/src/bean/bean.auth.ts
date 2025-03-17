import type { Constructable } from 'vona';
import type { IJwtToken } from 'vona-module-a-jwt';
import type { StrategyBase } from '../lib/strategyBase.ts';
import type { IAuthenticateOptions } from '../types/auth.ts';
import type { IAuthProviderRecord, IAuthProviderStrategy, IAuthProviderVerify, TypeStrategyOptions } from '../types/authProvider.ts';
import { BeanBase, deepExtend } from 'vona';
import { Bean } from 'vona-module-a-bean';

@Bean()
export class BeanAuth extends BeanBase {
  async authenticate<T extends keyof IAuthProviderRecord>(
    authProviderName: T,
    options?: IAuthenticateOptions<IAuthProviderRecord[T]>,
  ): Promise<IJwtToken | undefined> {
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
    const beanAuthProvider = this.app.bean._getBean<IAuthProviderVerify & IAuthProviderStrategy>(onionSlice.beanOptions.beanFullName as any);
    // direct
    if (!onionOptions.redirect) {
      return await this.scope.service.auth.authenticateCallback(entityAuthProvider, beanAuthProvider, clientOptions, onionOptions, options?.state);
    }
    // redirect
    const callbackURL = '';
    const state = '';
    const strategyOptions: TypeStrategyOptions = Object.assign({}, clientOptions, { callbackURL, state });
    const Strategy: Constructable<StrategyBase> = await beanAuthProvider.strategy(clientOptions, onionOptions) as Constructable<StrategyBase>;
    const strategy = new Strategy(strategyOptions, () => {
      console.log('----strategy verified');
    });
    strategy.authenticate(this.ctx.req, strategyOptions);
  }
}
