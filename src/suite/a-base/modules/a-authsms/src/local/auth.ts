import { BeanBase, Local } from '@cabloy/core';
import { __ThisModule__ } from '../resource/this.js';

@Local()
export class LocalAuth extends BeanBase {
  async signup({ user, state = 'login', userName, realName, mobile }: any) {
    // profileUser
    const profileUser = {
      module: __ThisModule__,
      provider: 'authsms',
      profileId: mobile,
      maxAge: 0,
      profile: {
        mobile,
        rememberMe: false,
      },
    };

    // verify
    const verifyUser = await this.ctx.bean.user.verify({ state, profileUser });
    if (!verifyUser) this.ctx.throw(403);

    // userId
    const userId = verifyUser.agent.id;

    // override user's info: userName/realName/mobile
    const userNew: any = { id: userId };
    if (userName) {
      if (state === 'login' || !user.userName || user.userName.indexOf('__') > -1) {
        userNew.userName = userName;
      }
    }
    if (realName) {
      userNew.realName = realName;
    }
    await this.ctx.bean.user.save({
      user: userNew,
    });
    // save mobile
    await this.ctx.bean.user.setActivated({
      user: { id: userId, mobile, mobileVerified: 1 },
    });

    // login now
    //   always no matter login/associate
    await this.ctx.bean.auth.login(verifyUser);

    // ok
    return verifyUser;
  }

  // data: { mobile, rememberMe }
  async signin({ data, state = 'login' }: any) {
    const res = await this.ctx.bean.authProvider.authenticateDirect({
      module: __ThisModule__,
      providerName: 'authsms',
      query: { state },
      body: { data },
    });
    // const res = await this.ctx.meta.util.performAction({
    //   method: 'post',
    //   url: `/a/auth/passport/a-authsms/authsms?state=${state}`,
    //   body: { data },
    // });
    return res;
  }

  async mobileVerify({ user, mobile }: any) {
    await this.signup({ user, state: 'associate', userName: null, realName: null, mobile });
  }
}
