import { Bean } from '@cabloy/core';
import { BeanAuthProviderBase } from 'cabloy-module-api-a-auth';

import Strategy from '../meta/passport/strategy.js';

@Bean({ scene: 'auth.provider' })
export class AuthProviderSimple extends BeanAuthProviderBase {
  get localSimple() {
    return this.ctx.bean.local.module(__ThisModule__).simple;
  }
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
    // const { auth, password, rememberMe } = body.data;
    // validate
    await this.ctx.bean.validation.validate({ module: __ThisModule__, validator: 'signin', data: body.data });
    // exists
    return await this.ctx.bean.authSimple.ensureAuthUser({ beanProvider: this, data: body.data });
  }
}
