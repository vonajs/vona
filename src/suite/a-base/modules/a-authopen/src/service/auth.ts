import { BeanBase, Service } from 'vona';
import { __ThisModule__ } from '../resource/this.js';

@Service()
export class ServiceAuth extends BeanBase {
  // data: { clientID, clientSecret }
  async signin({ data, state = 'login' }: any) {
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
