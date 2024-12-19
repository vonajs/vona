import { BeanTemp } from 'vona-module-a-bean';
import { __ThisModule__ } from '../.metadata/this.js';

import { BeanAuthProviderBase } from 'vona-module-a-auth';

import Strategy from '../meta/passport/strategy.js';

@BeanTemp({ scene: 'auth.provider' })
export class AuthProviderSimple extends BeanAuthProviderBase {
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
    await this.app.bean.validation.validate({ module: __ThisModule__, validator: 'signin', data: body.data });
    // exists
    return await this.app.bean.authSimple.ensureAuthUser({ beanProvider: this, data: body.data });
  }
}
