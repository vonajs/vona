import { BeanBase, Local } from '@cabloy/core';

const moduleInfo = module.info;

@Local()
export class LocalAuth extends BeanBase {
  // data: { clientID, clientSecret }
  async signin({ data, state = 'login' }) {
    // signin
    await this.ctx.bean.authProvider.authenticateDirect({
      module: moduleInfo.relativeName,
      providerName: 'authopen',
      query: { state },
      body: { data },
    });
    // user info
    return await this.ctx.bean.auth.getLoginInfo({ clientId: true });
  }
}
