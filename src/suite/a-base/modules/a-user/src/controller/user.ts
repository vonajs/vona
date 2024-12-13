mport { BeanBase } from 'vona';
import { Controller } from 'vona-module-a-web';

@Controller()
export class ControllerUser extends BeanBase {
  async save() {
    const res = await this.scope.service.user.save({
      data: this.ctx.request.body.data,
      user: this.ctx.state.user.agent,
    });
    this.app.success(res);
  }

  async saveAvatar() {
    const res = await this.scope.service.user.saveAvatar({
      data: this.ctx.request.body.data,
      user: this.ctx.state.user.agent,
    });
    this.app.success(res);
  }

  async saveLocale() {
    // check demo
    this.app.bean.util.checkDemo();
    const res = await this.scope.service.user.saveLocale({
      data: this.ctx.request.body.data,
      user: this.ctx.state.user.agent,
    });
    this.app.success(res);
  }

  async changeUserName() {
    // check demo
    this.app.bean.util.checkDemo();
    const res = await this.scope.service.user.changeUserName({
      data: this.ctx.request.body.data,
      user: this.ctx.state.user.agent,
    });
    this.app.success(res);
  }

  async agent() {
    const res = await this.scope.service.user.agent({ userId: this.ctx.state.user.agent!.id });
    this.app.success(res);
  }

  async agentsBy() {
    const res = await this.scope.service.user.agentsBy({ userId: this.ctx.state.user.agent!.id });
    this.app.success(res);
  }

  async userByMobile() {
    const res = await this.scope.service.user.userByMobile({ mobile: this.ctx.request.body.mobile });
    this.app.success(res);
  }

  async addAgent() {
    // check demo
    this.app.bean.util.checkDemo();
    const res = await this.scope.service.user.addAgent({
      userIdAgent: this.ctx.request.body.userIdAgent,
      userId: this.ctx.state.user.agent!.id,
    });
    this.app.success(res);
  }

  async removeAgent() {
    // check demo
    this.app.bean.util.checkDemo();
    const res = await this.scope.service.user.removeAgent({
      userIdAgent: this.ctx.request.body.userIdAgent,
      userId: this.ctx.state.user.agent!.id,
    });
    this.app.success(res);
  }

  async switchAgent() {
    // check demo
    this.app.bean.util.checkDemo();
    const res = await this.scope.service.user.switchAgent({
      userIdAgent: this.ctx.request.body.userIdAgent,
    });
    this.app.success(res);
  }

  async switchOffAgent() {
    // check demo
    this.app.bean.util.checkDemo();
    const res = await this.scope.service.user.switchOffAgent();
    this.app.success(res);
  }

  async authentications() {
    const res = await this.scope.service.user.authentications({
      user: this.ctx.state.user.agent,
    });
    this.app.success(res);
  }

  async authenticationDisable() {
    // check demo
    this.app.bean.util.checkDemo();
    const res = await this.scope.service.user.authenticationDisable({
      authId: this.ctx.request.body.authId,
      user: this.ctx.state.user.agent,
    });
    this.app.success(res);
  }

  async themeLoad() {
    const res = await this.scope.service.user.themeLoad({
      appKey: this.ctx.request.body.appKey,
      user: this.ctx.state.user.agent,
    });
    this.app.success(res);
  }

  async themeSave() {
    await this.scope.service.user.themeSave({
      appKey: this.ctx.request.body.appKey,
      theme: this.ctx.request.body.theme,
      user: this.ctx.state.user.agent,
    });
    this.app.success();
  }
}
