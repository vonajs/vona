import { BeanSimple } from '../bean/beanSimple.js';

export class CtxMockUtil extends BeanSimple {
  // login
  async login({ auth, password = '123456' }) {
    return await (<any>this.ctx.bean).authSimple.signinDirect({ data: { auth, password } });
  }

  // logout
  async logout() {
    return await (<any>this.ctx.bean).auth.logout();
  }

  // catchError
  async catchError(fnMethod, fnError) {
    let success;
    let data;
    try {
      data = await fnMethod();
      success = true;
    } catch (err) {
      success = false;
      await fnError(err);
    }
    // success
    if (success) {
      const err = { code: 0 };
      await fnError(err, data);
    }
    return data;
  }
}
