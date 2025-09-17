import type { Constructable } from 'vona';
import type { IDecoratorControllerOptions } from 'vona-module-a-web';
import type { StrategyBase } from '../lib/strategyBase.ts';
import type { IAuthenticateStrategyState } from '../types/auth.ts';
import type { IAuthProviderStrategy, IAuthProviderVerify, TypeStrategyOptions, TypeStrategyVerifyArgs } from '../types/authProvider.ts';
import { BeanBase, cast, deepExtend } from 'vona';
import { Aspect } from 'vona-module-a-aspect';
import { Api } from 'vona-module-a-openapi';
import { Controller, Web } from 'vona-module-a-web';

export interface IControllerOptionsPassport extends IDecoratorControllerOptions {}

@Controller<IControllerOptionsPassport>('passport')
export class ControllerPassport extends BeanBase {
  @Web.get('callback')
  @Aspect.guardGlobal('a-user:passport', { public: true })
  @Aspect.middlewareGlobal('a-instance:instance', { enable: false })
  @Api.exclude()
  async callback() {
    const code = this.ctx.query.code as string;
    const stateQuery = this.ctx.query.state as string;
    if (!stateQuery) this.app.throw(403);
    const strategyState: IAuthenticateStrategyState = await this.bean.jwt.get('oauthstate').verify(stateQuery) as unknown as IAuthenticateStrategyState;
    return await this.bean.executor.newCtx(async () => {
      cast(this.ctx.req).query = { code, state: stateQuery };
      return await this._callback(strategyState);
    }, { locale: strategyState.locale, instanceName: strategyState.instanceName, instance: true });
  }

  private async _callback(strategyState: IAuthenticateStrategyState) {
    // authProvider
    const entityAuthProvider = await this.bean.authProvider.get({ id: strategyState.authProviderId });
    if (!entityAuthProvider || entityAuthProvider?.disabled) return this.app.throw(403);
    const authProviderName = entityAuthProvider.providerName;
    // clientName
    const clientName = entityAuthProvider.clientName ?? 'default';
    // onionSlice
    const onionSlice = this.bean.onion.authProvider.getOnionSliceEnabled(false, authProviderName as any);
    if (!onionSlice) throw new Error(`Auth provider not found: ${authProviderName}`);
    const onionOptions = onionSlice.beanOptions.options!;
    // clientOptions
    const optionsMeta = onionSlice.beanOptions.options;
    const clientOptions = deepExtend(
      {},
      optionsMeta?.default,
      optionsMeta?.clients?.[clientName as any],
      entityAuthProvider.clientOptions,
    );
    // execute
    const beanAuthProvider = this.app.bean._getBean<IAuthProviderVerify & IAuthProviderStrategy>(onionSlice.beanOptions.beanFullName as any);
    // strategy
    if (!beanAuthProvider.strategy) return this.app.throw(401);
    const strategyOptions: TypeStrategyOptions = clientOptions;
    const Strategy: Constructable<StrategyBase> = await beanAuthProvider.strategy(clientOptions, onionOptions) as Constructable<StrategyBase>;
    // strategy.authenticate
    return new Promise((resolve, reject) => {
      const strategy = new Strategy(strategyOptions, async (...args: TypeStrategyVerifyArgs) => {
        try {
          const jwt = await this.scope.service.auth.authenticateCallback(
            entityAuthProvider,
            beanAuthProvider,
            clientOptions,
            onionOptions,
            strategyState,
            args,
          );
          // code
          const code = await this.bean.passport.createOauthCodeFromOauthAuthToken(jwt.accessToken);
          if (strategy.name === 'mock') {
            // mock
            const jwt2 = await this.bean.passport.createAuthTokenFromOauthCode(code);
            return resolve(jwt2);
          } else {
            // redirect
            if (!strategyState.redirect) return reject(new Error('redirect not specified'));
            return this.ctx.redirect(`${strategyState.redirect}?${this.scope.config.oauthCodeField}=${encodeURIComponent(code)}`);
          }
        } catch (err) {
          reject(err);
        }
      });
      strategy.error = (err: Error) => {
        reject(err);
      };
      strategy.authenticate(this.ctx.req, strategyOptions);
    });
  }
}
