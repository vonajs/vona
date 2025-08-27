import type { Constructable } from 'vona';
import type { IJwtToken } from 'vona-module-a-jwt';
import type { StrategyBase } from '../lib/strategyBase.ts';
import type { IAuthenticateOptions, IAuthenticateStrategyState } from '../types/auth.ts';
import type { IAuthProviderRecord, IAuthProviderStrategy, IAuthProviderVerify, TypeStrategyOptions } from '../types/authProvider.ts';
import { BeanBase, deepExtend, uuidv4 } from 'vona';
import { Bean } from 'vona-module-a-bean';
import { $apiPath } from 'vona-module-a-web';

@Bean()
export class BeanAuth extends BeanBase {
  async authenticate<T extends keyof IAuthProviderRecord>(
    authProviderName: T,
    options?: IAuthenticateOptions<IAuthProviderRecord[T]>,
  ): Promise<IJwtToken | undefined> {
    // clientName
    const clientName = options?.clientName ?? 'default';
    // stateIntention
    const stateIntention = options?.state?.intention ?? 'login';
    // onionSlice
    const onionSlice = this.bean.onion.authProvider.getOnionSliceEnabled(false, authProviderName);
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
    // strategy: no
    if (!beanAuthProvider.strategy) {
      return await this.scope.service.auth.authenticateCallback(
        entityAuthProvider,
        beanAuthProvider,
        clientOptions,
        onionOptions,
        options?.state as unknown as IAuthenticateStrategyState,
      );
    }
    // strategy
    // callbackURL
    const callbackURLRelative = $apiPath('/auth/passport/callback');
    const callbackURL = this.app.util.getAbsoluteUrlByApiPath(callbackURLRelative);
    // strategyState
    const accessToken = stateIntention === 'login' ? undefined : await this.bean.passport.createOauthAuthToken();
    const strategyState: IAuthenticateStrategyState = Object.assign({}, options?.state, {
      accessToken,
      authProviderId: entityAuthProvider.id,
      instanceName: this.ctx.instanceName!,
    });
    const strategyStateString = await this.bean.jwt.createOauthState(strategyState);
    // strategy
    const strategyOptions: TypeStrategyOptions = Object.assign({}, clientOptions, {
      callbackURL,
      state: strategyStateString,
    });
    const Strategy: Constructable<StrategyBase> = await beanAuthProvider.strategy(clientOptions, onionOptions) as Constructable<StrategyBase>;
    const strategy = new Strategy(strategyOptions, () => {});
    // strategy.authenticate
    return new Promise((resolve, reject) => {
      strategy.redirect = async (location: string) => {
        // real
        if (strategy.name !== 'mock') {
          return this.ctx.redirect(location);
        }
        // mock
        try {
          const res = await this.bean.executor.performAction('get', callbackURLRelative as any, {
            query: {
              code: uuidv4(),
              state: strategyStateString,
            },
          });
          resolve(res);
        } catch (err) {
          reject(err);
        }
      };
      strategy.error = (err: Error) => {
        reject(err);
      };
      strategy.authenticate(this.ctx.req, strategyOptions);
    });
  }
}
