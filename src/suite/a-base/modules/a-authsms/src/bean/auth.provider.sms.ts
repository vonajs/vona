import { __ThisModule__ } from '../.metadata/this.js';
import { BeanAuthProviderBase } from 'vona-module-a-auth';

import Strategy from '../meta/passport/strategy.js';
import { BeanTemp } from 'vona-module-a-bean';

@BeanTemp({ scene: 'auth.provider' })
export class AuthProviderSms extends BeanAuthProviderBase {
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
    await this.app.bean.validation.validate({ module: __ThisModule__, validator: 'signin', data: body.data });
    // exists
    const user = await this.app.bean.user.exists({ mobile });
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
