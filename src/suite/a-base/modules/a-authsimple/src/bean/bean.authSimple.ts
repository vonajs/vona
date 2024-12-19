import { Bean } from 'vona-module-a-bean';
import { __ThisModule__ } from '../.metadata/this.js';
import { BeanBase, cast } from 'vona';

@Bean()
export class BeanAuthSimple extends BeanBase {
  get modelAuthSimple() {
    return this.scope.model.authSimple;
  }
  get modelAuth() {
    return this.bean.scope('a-auth').model.auth;
  }
  get localSimple() {
    return this.scope.service.simple;
  }
  get configModule() {
    return this.scope.config;
  }
  get cacheDb() {
    return this.scope._bean.cacheRedis;
  }

  // mobile: not use
  async signup({ user, state = 'login', userName, realName, email, /* mobile,*/ password }: any) {
    // add authsimple
    const authSimpleId = await this._addAuthSimple({ password });

    // profileUser
    const profileUser = {
      module: __ThisModule__,
      provider: 'authsimple',
      profileId: authSimpleId,
      maxAge: 0,
      profile: {
        authSimpleId,
        rememberMe: false,
      },
    };

    // verify
    const verifyUser = await this.app.bean.user.verify({ state, profileUser });
    if (!verifyUser) this.app.throw(403);

    // userId
    const userId = verifyUser.agent.id;
    // remove old records
    await this.modelAuthSimple.delete({ userId });
    // update userId
    await this.modelAuthSimple.update({ id: authSimpleId, userId });

    // override user's info: userName/realName/email
    const userNew: any = { id: userId, realName };
    if (state === 'login' || !user.userName || user.userName.indexOf('__') > -1) {
      userNew.userName = userName;
    }
    await this.app.bean.user.save({
      user: userNew,
    });
    // save email
    if (email !== verifyUser.agent.email) {
      await this.app.bean.user.setActivated({
        user: { id: userId, email, emailConfirmed: 0 },
      });
    }

    // login now
    //   always no matter login/associate
    await this.app.bean.auth.login(verifyUser);

    // ok
    return verifyUser;
  }

  // data: { auth, password, rememberMe }
  async signin({ data, state = 'login' }: any) {
    const res = await this.app.bean.authProvider.authenticateDirect({
      module: __ThisModule__,
      providerName: 'authsimple',
      query: { state },
      body: { data },
    });
    // const res = await this.bean.executor.performAction({
    //   method: 'post',
    //   url: `/a/auth/passport/a-authsimple/authsimple?state=${state}`,
    //   body: { data },
    // });
    return res;
  }

  async signinDirect({ data, state = 'login' }: any) {
    // beanProvider
    const beanProvider = this.app.bean.authProvider.createAuthProviderBean({
      module: __ThisModule__,
      providerName: 'authsimple',
      providerScene: null,
    });
    // profileUser
    const profileUser = await this.ensureAuthUser({ beanProvider, data });
    // verifyUser
    const verifyUser = await this.app.bean.user.verify({ state, profileUser });
    if (!verifyUser) this.app.throw(403);
    // login
    await this.app.bean.auth.login(verifyUser);
    // ok
    return verifyUser;
  }

  async _addAuthSimple({ password }: any) {
    // hash
    password = password || this.configModule.defaultPassword;
    const hash = await this.localSimple.calcPassword({ password });
    // auth simple
    const res = await this.modelAuthSimple.insert({
      userId: 0,
      hash,
    });
    return res[0];
  }

  async add({ userId, password }: any) {
    // add authsimple
    const authSimpleId = await this._addAuthSimple({ password });
    // update userId
    await this.modelAuthSimple.update({ id: authSimpleId, userId });

    // auth
    const providerItem = await this.app.bean.authProvider.getAuthProvider({
      module: __ThisModule__,
      providerName: 'authsimple',
    });
    await this.modelAuth.insert({
      userId,
      providerId: providerItem.id,
      profileId: authSimpleId,
      profile: JSON.stringify({
        authSimpleId,
        rememberMe: false,
      }),
    });
    return authSimpleId;
  }

  async passwordChange({ passwordOld, passwordNew, userId }: any) {
    let authSimpleId;
    // check if exists
    const authSimple = await this.modelAuthSimple.get({ userId });
    if (!authSimple) {
      // create a new one
      authSimpleId = await this.add({ userId, password: passwordNew });
    } else {
      // verify old one
      const authSimple = await this.localSimple.verify({ userId, password: passwordOld });
      if (!authSimple) this.app.throw(403);
      authSimpleId = cast(authSimple).id;
    }

    // save new
    await this._passwordSaveNew({ passwordNew, userId });

    // profileUser
    const profileUser = {
      module: __ThisModule__,
      provider: 'authsimple',
      profileId: authSimpleId,
      maxAge: 0,
      profile: {
        authSimpleId,
        rememberMe: false,
      },
    };

    // verify
    const verifyUser = await this.app.bean.user.verify({ state: 'associate', profileUser });
    if (!verifyUser) this.app.throw(403);

    // force kickout all login records
    await this.app.bean.userOnline.kickOut({ user: { id: userId } });

    // login now
    //   always no matter login/associate
    // await this.app.bean.auth.login(verifyUser);
  }

  async _passwordSaveNew({ passwordNew, userId }: any) {
    // save new
    const auth = await this.modelAuthSimple.get({
      userId,
    });
    const hash = await this.localSimple.calcPassword({ password: passwordNew });
    await this.modelAuthSimple.update({
      id: auth!.id,
      hash,
    });
  }

  async passwordReset({ passwordNew, token }: any) {
    // token value
    const cacheKey = `passwordReset:${token}`;
    const value = await this.cacheDb.get(cacheKey);
    if (!value) {
      // expired, send confirmation mail again
      //  1003: PasswordResetEmailExpired
      this.scope.error.PasswordResetEmailExpired.throw();
    }
    // userId
    const userId = value.userId;

    // check if exists
    const authSimple = await this.modelAuthSimple.get({ userId });
    if (!authSimple) {
      // create a new one
      await this.add({ userId, password: passwordNew });
    } else {
      // save new
      await this._passwordSaveNew({ passwordNew, userId });
    }
    // clear token
    await this.cacheDb.remove(cacheKey);
    // login antomatically
    const user = await this.app.bean.user.get({ id: userId });
    const data = { auth: user!.email, password: passwordNew, rememberMe: false };
    const user2 = await this.signin({ data, state: 'login' });
    // ok
    return user2;
  }

  async passwordForgot({ email }: any) {
    // user by email
    const user = await this.app.bean.user.exists({ email });
    if (!user) return this.$scope.base.error.UserDoesNotExist.throw();
    // link
    const token = this.app.bean.util.uuidv4();
    const link = this.app.bean.base.getAbsoluteUrl(`/#!/a/authsimple/passwordReset?token=${token}`);
    // config
    const configTemplate = this.configModule.email.templates.passwordReset;
    // email subject
    let subject = this.app.text(configTemplate.subject);
    subject = this.app.bean.util.replaceTemplate(subject, { siteName: this.ctx.instance.title });
    // email body
    let body = this.app.text(configTemplate.body);
    body = this.app.bean.util.replaceTemplate(body, {
      userName: user.userName,
      link,
      siteName: this.ctx.instance.title,
    });
    // send
    await this.app.bean.mail.send({
      scene: null, // use default
      message: {
        to: email,
        subject,
        text: body,
      },
    });
    // save
    await this.cacheDb.set(`passwordReset:${token}`, { userId: user.id }, this.configModule.passwordReset.timeout);
  }

  async emailConfirm({ email, user }: any) {
    // save email
    await this.app.bean.user.setActivated({
      user: { id: user.id, email, emailConfirmed: 0 },
    });
    // link
    const token = this.app.bean.util.uuidv4();
    const link = this.app.bean.base.getAbsoluteUrl(`/api/a/authsimple/auth/emailConfirmation?token=${token}`);
    // config
    const configTemplate = this.configModule.email.templates.confirmation;
    // email subject
    let subject = this.app.text(configTemplate.subject);
    subject = this.app.bean.util.replaceTemplate(subject, { siteName: this.ctx.instance.title });
    // email body
    let body = this.app.text(configTemplate.body);
    body = this.app.bean.util.replaceTemplate(body, {
      userName: user.userName,
      link,
      siteName: this.ctx.instance.title,
    });
    // send
    await this.app.bean.mail.send({
      scene: null, // use default
      message: {
        to: email,
        subject,
        text: body,
      },
    });
    // save
    await this.cacheDb.set(`emailConfirm:${token}`, { userId: user.id }, this.configModule.confirmation.timeout);
  }

  // invoke by user clicking the link
  async emailConfirmation({ token }: any) {
    // token value
    const cacheKey = `emailConfirm:${token}`;
    const value = await this.cacheDb.get(cacheKey);
    if (!value) {
      // expired, send confirmation mail again
      const data = {
        message: this.scope.locale.ConfirmationEmailExpired(),
        link: '/a/authsimple/emailConfirm',
        linkText: this.scope.locale['Resend Confirmation Email'](),
      };
      const url = this.app.bean.base.getAlertUrl({ data });
      return this.ctx.redirect(url);
    }
    // userId
    const userId = value.userId;
    // activated
    await this.app.bean.user.setActivated({
      user: { id: userId, emailConfirmed: 1 },
    });
    // clear token
    await this.cacheDb.remove(cacheKey);
    // not: login antomatically
    // ok
    const data = {
      message: this.scope.locale.ConfirmationEmailSucceeded(),
      link: '#back',
      linkText: this.scope.locale.Close(),
    };
    const url = this.app.bean.base.getAlertUrl({ data });
    return this.ctx.redirect(url);
  }

  async checkStatus({ user }: any) {
    // check if exists
    const auth = await this.modelAuthSimple.get({
      userId: user.id,
    });
    return {
      exists: !!auth,
    };
  }

  async ensureAuthUser({ beanProvider, data: { auth, password, rememberMe } }) {
    // exists
    const user = await this.app.bean.user.exists({ userName: auth, email: auth, mobile: auth });
    if (!user) return this.scope.error.AuthenticationFailed.throw();
    // disabled
    if (user.disabled) return this.scope.error.UserIsDisabled.throw();
    // verify
    const authSimple = await this.localSimple.verify({ userId: user.id, password });
    if (!authSimple) return this.scope.error.AuthenticationFailed.throw();
    return {
      module: beanProvider.providerModule,
      provider: beanProvider.providerName,
      providerScene: beanProvider.providerScene,
      profileId: authSimple.id,
      maxAge: rememberMe ? null : 0,
      authShouldExists: true,
      profile: {
        authSimpleId: authSimple.id,
        rememberMe,
      },
    };
  }
}
