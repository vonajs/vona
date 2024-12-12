import { BeanBase, Controller } from 'vona';

@Controller()
export class ControllerAuth extends BeanBase {
  async signin() {
    // data: { auth, password, rememberMe }
    const data = this.ctx.request.body.data;
    const state = this.ctx.request.body.state;
    const res = await this.scope.service.auth.signin({ data, state });
    this.app.success(res);
  }

  async signup() {
    const { userName, realName, email, mobile, password } = this.ctx.request.body.data;
    const state = this.ctx.request.body.state;
    const res = await this.scope.service.auth.signup({
      user: this.ctx.state.user.agent,
      state,
      userName,
      realName,
      email,
      mobile,
      password,
    });
    this.app.success(res);
  }

  async passwordChange() {
    // check demo
    this.app.bean.util.checkDemo();
    const { passwordOld, passwordNew } = this.ctx.request.body.data;
    await this.scope.service.auth.passwordChange({ passwordOld, passwordNew, userId: this.ctx.state.user.agent!.id });
    this.app.success();
  }

  async passwordForgot() {
    // check demo
    this.app.bean.util.checkDemo();
    const { email } = this.ctx.request.body.data;
    await this.scope.service.auth.passwordForgot({ email });
    this.app.success();
  }

  async passwordReset() {
    // check demo
    this.app.bean.util.checkDemo();
    const { passwordNew } = this.ctx.request.body.data;
    const token = this.ctx.request.body.token;
    await this.scope.service.auth.passwordReset({ passwordNew, token });
    this.app.success();
  }

  async emailConfirm() {
    const { email } = this.ctx.request.body.data;
    await this.scope.service.auth.emailConfirm({ email, user: this.ctx.state.user.agent });
    this.app.success();
  }

  async emailConfirmation() {
    const token = this.ctx.request.query.token;
    await this.scope.service.auth.emailConfirmation({ token });
    // this.app.success();
  }

  async checkStatus() {
    const res = await this.scope.service.auth.checkStatus({ user: this.ctx.state.user.agent });
    this.app.success(res);
  }
}
