import { BeanSimple } from '../bean/beanSimple.js';

export class CtxMockUtil extends BeanSimple {
  // login
  async login({ auth, password = '123456' }) {
    return await (<any>this.app.bean).authSimple.signinDirect({ data: { auth, password } });
  }

  // logout
  async logout() {
    return await (<any>this.app.bean).auth.logout();
  }
}
