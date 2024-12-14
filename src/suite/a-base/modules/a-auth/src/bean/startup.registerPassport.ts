import { BeanBase } from 'vona';
import { IStartupExecute, Startup } from 'vona-module-a-startup';

@Startup()
export class StartupRegisterPassport extends BeanBase implements IStartupExecute {
  async execute() {
    // verify
    this.app.passport.verify(async (ctx, profileUser) => {
      // state: login/associate
      const state = ctx.request.query.state || 'login';
      // maybe ready
      if (profileUser.op && profileUser.agent && profileUser.provider) {
        return profileUser;
      }
      // user verify
      return await this.bean.user.verify({ state, profileUser });
    });
    // serializeUser
    this.app.passport.serializeUser(async (ctx, user) => {
      ctx.state.user = user;
      return await this.bean.auth.serializeUser({ user });
    });
    // deserializeUser
    this.app.passport.deserializeUser(async (ctx, user) => {
      if (!ctx.instance) {
        return null;
      }
      if (ctx.state && ctx.state.user) {
        return this.bean.auth._pruneUser({ user: ctx.state.user });
      }
      return await this.bean.auth.deserializeUser({ user });
    });
  }
}
