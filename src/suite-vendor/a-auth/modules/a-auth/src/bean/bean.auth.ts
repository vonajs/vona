import type { IJwtToken } from 'vona-module-a-jwt';
import type { DtoAuth } from '../dto/auth.ts';
import type { EntityAuth } from '../entity/auth.ts';
import type { IAuthenticateOptions, IAuthenticateStrategyState } from '../types/auth.ts';
import type { IAuthProviderClientOptions, IAuthProviderRecord, IAuthProviderStrategy, IAuthProviderVerify, TypeStrategyOptions } from '../types/authProvider.ts';
import { BeanBase, deepExtend } from 'vona';
import { Bean } from 'vona-module-a-bean';
import { $apiPath } from 'vona-module-a-openapiutils';

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
    const onionSlice = this.bean.onion.authProvider.getOnionSliceEnabled(true, authProviderName);
    if (!onionSlice) throw new Error(`Auth provider not found: ${authProviderName}`);
    const onionOptions = onionSlice.beanOptions.options!;
    // authProvider
    const entityAuthProvider = await this.bean.authProvider.get({ providerName: authProviderName, clientName });
    if (!entityAuthProvider || entityAuthProvider?.disabled) return this.app.throw(403);
    // clientOptions
    const optionsMeta = onionSlice.beanOptions.options;
    const clientOptions: IAuthProviderClientOptions = deepExtend(
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
    const accessToken = ['login', 'register'].includes(stateIntention) ? undefined : await this.bean.passport.createOauthAuthToken();
    const strategyState: IAuthenticateStrategyState = Object.assign({}, options?.state, {
      accessToken,
      authProviderId: entityAuthProvider.id,
      instanceName: this.ctx.instanceName!,
      locale: this.ctx.locale,
      tz: this.ctx.tz,
      clientOptions: {
        confirmed: clientOptions.confirmed,
        mockUsername: clientOptions.mockUsername,
      },
    } satisfies IAuthenticateStrategyState);
    const strategyStateString = await this.bean.jwt.createOauthState(strategyState);
    // strategy
    const strategyOptions: TypeStrategyOptions = Object.assign({}, clientOptions, {
      callbackURL,
      state: strategyStateString,
    });
    const Strategy = await this.scope.service.auth.getStrategyConstructable(beanAuthProvider, clientOptions, onionOptions);
    const strategy = new Strategy(strategyOptions, () => {});
    // strategy.authenticate
    return new Promise((resolve, reject) => {
      strategy.redirect = (location: string) => {
        // real
        if (!clientOptions.mockUsername) {
          return this.ctx.redirect(location);
        }
        // mock
        this.ctx.request.query.code = clientOptions.mockUsername;
        this.ctx.request.query.state = strategyStateString;
        return this.scope.service.auth.authCallback(strategyState).then(resolve).catch(reject);
      };
      strategy.error = (err: Error) => {
        reject(err);
      };
      return strategy.authenticate(this.ctx.request, strategyOptions);
    });
  }

  async findOne(auth: Partial<EntityAuth>): Promise<DtoAuth | undefined> {
    if (String(auth.id).charAt(0) === '-') return auth as unknown as DtoAuth;
    return await this.scope.model.auth.get(auth, {
      columns: ['id', 'profileId'],
      include: { authProvider: true },
    });
  }
}
