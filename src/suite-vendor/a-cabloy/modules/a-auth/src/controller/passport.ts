import type { Constructable } from 'vona';
import type { StrategyBase } from '../lib/strategyBase.ts';
import type { IAuthenticateStrategyState } from '../types/auth.ts';
import type { IAuthProviderStrategy, IAuthProviderVerify, TypeStrategyOptions, TypeStrategyVerifyArgs } from '../types/authProvider.ts';
import { BeanBase, cast, deepExtend } from 'vona';
import { UseMiddlewareGlobal } from 'vona-module-a-aspect';
import { Api } from 'vona-module-a-openapi';
import { Public } from 'vona-module-a-user';
import { Controller, Get } from 'vona-module-a-web';

@Controller('passport')
export class ControllerPassport extends BeanBase {
  @Get('callback')
  @Public()
  @UseMiddlewareGlobal('a-instance:instance', { enable: false })
  @Api.exclude()
  async callback() {
    const code = this.ctx.query.code as string;
    const state: IAuthenticateStrategyState = JSON.parse(this.ctx.query.state as string);
    return await this.bean.executor.newCtxIsolate(async () => {
      cast(this.ctx.req).query = { code, state: this.ctx.query.state as string };
      return await this._callback(state);
    }, { instanceName: state.instanceName });
  }

  private async _callback(state: IAuthenticateStrategyState) {
    // authProvider
    const entityAuthProvider = await this.bean.authProvider.get({ id: state.authProviderId });
    if (!entityAuthProvider || entityAuthProvider?.disabled) return this.app.throw(403);
    const authProviderName = `${entityAuthProvider.module}:${entityAuthProvider.providerName}`;
    // clientName
    const clientName = entityAuthProvider.clientName ?? 'default';
    // onionSlice
    const onionSlice = this.bean.onion.authProvider.getOnionSliceEnabled(authProviderName as any);
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
    const strategyOptions: TypeStrategyOptions = clientOptions;
    const Strategy: Constructable<StrategyBase> = await beanAuthProvider.strategy(clientOptions, onionOptions) as Constructable<StrategyBase>;
    // strategy.authenticate
    return new Promise(resolve => {
      const strategy = new Strategy(strategyOptions, async (...args: TypeStrategyVerifyArgs) => {
        const jwt = await this.scope.service.auth.authenticateCallback(
          entityAuthProvider,
          beanAuthProvider,
          clientOptions,
          onionOptions,
          state,
          args,
        );
        // code
        const code = await this.bean.passport.createOauthAuthTokenCode(jwt.accessToken);
        if (strategy.name === 'mock') {
          // mock
          const jwt2 = await this.bean.passport.createAuthTokenFromOauthCode(code);
          return resolve(jwt2);
        } else {
          // redirect
          if (!state.redirect) throw new Error('redirect not specified');
          this.app.redirect(`${state.redirect}?${this.scope.config.oauthCodeField}=${encodeURIComponent(code)}`);
        }
      });
      strategy.error = (err: Error) => {
        throw err;
      };
      strategy.authenticate(this.ctx.req, strategyOptions);
    });
  }
}
