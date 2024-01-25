import { BeanBase, Local } from '@cabloy/core';
import { __ThisModule__ } from '../resource/this.js';

@Local()
export class LocalAuth extends BeanBase {
  // data: { clientID, clientSecret }
  async signin({ data, state = 'login' }) {
    // signin
    await this.ctx.bean.authProvider.authenticateDirect({
      module: __ThisModule__,
      providerName: 'authopen',
      query: { state },
      body: { data },
    });
    // user info
    return await this.ctx.bean.auth.getLoginInfo({ clientId: true });
  }
}
