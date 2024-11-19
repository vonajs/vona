import { BeanBase, Service } from 'vona';
import { __ThisModule__ } from '../.metadata/this.js';

@Service()
export class ServiceAuth extends BeanBase {
  // data: { clientID, clientSecret }
  async signin({ data, state = 'login' }: any) {
    // signin
    await this.app.bean.authProvider.authenticateDirect({
      module: __ThisModule__,
      providerName: 'authopen',
      query: { state },
      body: { data },
    });
    // user info
    return await this.app.bean.auth.getLoginInfo({ clientId: true });
  }
}
