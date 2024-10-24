import { ScopeModule, __ThisModule__ } from '../.metadata/this.js';
import { Bean } from 'vona';
import { BeanAuthProviderBase } from 'vona-module-a-auth';

import Strategy from '../meta/passport/strategy.js';

@Bean({ scene: 'auth.provider' })
export class AuthProviderSimple extends BeanAuthProviderBase<ScopeModule> {
  get localSimple() {
    return this.scope.service.simple;
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
