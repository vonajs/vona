import { BeanBase, Service } from 'vona';

@Service()
export class ServiceAuth extends BeanBase {
  // mobile: not use
  async signup({ user, state = 'login', userName, realName, email, /* mobile,*/ password }: any) {
    return await this.app.bean.authSimple.signup({ user, state, userName, realName, email, /* mobile,*/ password });
  }

  // data: { auth, password, rememberMe }
  async signin({ data, state = 'login' }: any) {
    return await this.app.bean.authSimple.signin({ data, state });
  }

  async add({ userId, password }: any) {
    return await this.app.bean.authSimple.add({ userId, password });
  }

  async passwordChange({ passwordOld, passwordNew, userId }: any) {
    return await this.app.bean.authSimple.passwordChange({ passwordOld, passwordNew, userId });
  }

  async passwordReset({ passwordNew, token }: any) {
    return await this.app.bean.authSimple.passwordReset({ passwordNew, token });
  }

  async passwordForgot({ email }: any) {
    return await this.app.bean.authSimple.passwordForgot({ email });
  }

  async emailConfirm({ email, user }: any) {
    return await this.app.bean.authSimple.emailConfirm({ email, user });
  }

  // invoke by user clicking the link
  async emailConfirmation({ token }: any) {
    return await this.app.bean.authSimple.emailConfirmation({ token });
  }

  async checkStatus({ user }: any) {
    return await this.app.bean.authSimple.checkStatus({ user });
  }
}
