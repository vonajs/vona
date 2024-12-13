import { BeanBase } from 'vona';
import { Controller } from 'vona-module-a-web';

@Controller()
export class ControllerAuth extends BeanBase {
  async signin() {
    // data: { mobile, rememberMe }
    const data = this.ctx.request.body.data;
    const state = this.ctx.request.body.state;
    const res = await this.scope.service.auth.signin({ data, state });
    this.app.success(res);
  }

  async signup() {
    const { userName, realName, mobile } = this.ctx.request.body.data;
    const state = this.ctx.request.body.state;
    const res = await this.scope.service.auth.signup({
      user: this.ctx.state.user.agent,
      state,
      userName,
      realName,
      mobile,
    });
    this.app.success(res);
  }

  async mobileVerify() {
    const { mobile } = this.ctx.request.body.data;
    const res = await this.scope.service.auth.mobileVerify({
      user: this.ctx.state.user.agent,
      mobile,
    });
    this.app.success(res);
  }
}
