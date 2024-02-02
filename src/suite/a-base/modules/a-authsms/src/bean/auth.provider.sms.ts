import { ScopeModule, __ThisModule__ } from '../resource/this.js';
import { Bean } from '@cabloy/core';
import { BeanAuthProviderBase } from 'cabloy-module-api-a-auth';

import Strategy from '../meta/passport/strategy.js';

@Bean({ scene: 'auth.provider' })
export class AuthProviderSms extends BeanAuthProviderBase<ScopeModule> {
  async getConfigDefault() {
    return null;
  }
  checkConfigValid(/* config*/) {
    return true;
  }
  getStrategy() {
    return Strategy;
  }
  async onVerify(body) {
    const { mobile, rememberMe } = body.data;
    // validate
    await this.ctx.bean.validation.validate({ module: __ThisModule__, validator: 'signin', data: body.data });
    // exists
    const user = await this.ctx.bean.user.exists({ mobile });
    if (!user) return this.scope.error.AuthenticationFailed.throw();
    // disabled
    if (user.disabled) return this.scope.error.UserIsDisabled.throw();
    return {
      module: this.providerModule,
      provider: this.providerName,
      providerScene: this.providerScene,
      profileId: mobile,
      maxAge: rememberMe ? null : 0,
      authShouldExists: true,
      profile: {
        mobile,
        rememberMe,
      },
    };
  }
}
