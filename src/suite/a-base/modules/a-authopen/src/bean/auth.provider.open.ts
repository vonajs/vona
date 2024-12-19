import { BeanTemp } from 'vona-module-a-bean';

import { BeanAuthProviderBase } from 'vona-module-a-auth';

import Strategy from '../meta/passport/strategy.js';

@BeanTemp({ scene: 'auth.provider' })
export class AuthProviderOpen extends BeanAuthProviderBase {
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
    const { clientID, clientSecret } = body.data;
    // verify
    const authOpen = await this.app.bean.authOpen.verify({ clientID, clientSecret });
    // maxAge
    let maxAge;
    if (authOpen.neverExpire) {
      // only one day
      maxAge = 0;
    } else {
      maxAge = authOpen.expireTime.valueOf() - Date.now();
    }
    return {
      module: this.providerModule,
      provider: this.providerName,
      providerScene: this.providerScene,
      profileId: authOpen.id,
      maxAge,
      authShouldExists: true,
      profile: {
        authOpenId: authOpen.id,
      },
    };
  }
}
