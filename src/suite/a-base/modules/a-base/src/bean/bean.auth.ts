import { Bean, BeanBase } from 'vona';

@Bean()
export class BeanAuth extends BeanBase {
  get model() {
    return this.$scope.auth.model.auth;
  }

  get modelAuth() {
    return this.$scope.auth.model.auth;
  }

  get modelAuthProvider() {
    return this.$scope.auth.model.authProvider;
  }

  get redisAuth() {
    return this.bean.redis.get('auth');
  }

  // return current user auth info
  //   { op:{id},agent:{id},provider}
  async echo() {
    try {
      // check
      await this.app.bean.user.check();
      // logined
      return await this.getLoginInfo({ clientId: true });
    } catch (_err) {
      // deleted,disabled
      return await this._logout_inner();
    }
  }

  async check() {
    return await this.getLoginInfo();
  }

  async login(user) {
    if ((<any>this.ctx.req).login) {
      await this.ctx.login(user);
    } else {
      this.ctx.state.user = user;
      (<any>this.ctx.req).user = this.app.bean.auth._pruneUser({ user });
    }
  }

  async logout() {
    const user = this.ctx.state.user;
    await this._sendMessageSystemLogout({ user });
    await this._clearRedisAuth({ user });
    await this._logout_inner();
  }

  async _logout_inner() {
    if ((<any>this.ctx.req).logout) {
      await this.ctx.logout();
    } else {
      this.ctx.state.user = null as any;
      (<any>this.ctx.req).user = null;
    }
    await this.app.bean.user.loginAsAnonymous();
    return await this.getLoginInfo();
  }

  async getLoginInfo(options?) {
    options = options || {};
    const needClientId = options.clientId === true;
    const isAuthOpen = this.app.bean.authOpen.isAuthOpen();
    // info
    const info: any = {
      user: this.ctx.state.user,
      instance: this._getInstance(),
      locales: this.app.bean.base.locales(),
    };
    // config
    if (!isAuthOpen) {
      info.config = await this._getConfig();
    }
    // clientId
    if (needClientId) {
      info.clientId = this.app.bean.util.uuidv4();
    }
    // login info event
    if (!isAuthOpen) {
      await this.scope.event.loginInfo.emit({ info });
    }
    // ok
    return info;
  }

  _getInstance() {
    return {
      name: this.ctx.instance.name,
      title: this.ctx.instance.title,
    };
  }

  async _getConfig() {
    // config
    let config: any = {};
    // config base
    config = this.app.bean.util.extend(config, {
      modules: {
        'a-base': {
          account: this._getAccount(),
        },
      },
    });
    // // theme
    // const themeStatus = `user-theme:${this.ctx.state.user.agent.id}`;
    // const theme = await this.app.bean.status.module('a-user').get(themeStatus);
    // if (theme) {
    //   config.theme = theme;
    // }
    // localeModules
    config.localeModules = this.app.bean.base.localeModules();
    // ok
    return config;
  }

  _getAccount() {
    // account
    const account = this.app.bean.util.extend({}, this.scope.config.account);
    account.activatedRoles = undefined;
    // url
    for (const key in account.activationProviders) {
      const relativeName = account.activationProviders[key];
      if (relativeName) {
        const moduleConfig = this.getScope(relativeName).config;
        this.app.bean.util.extend(account.url, moduleConfig.account.url);
      }
    }
    return account;
  }

  _getAuthRedisKey({ user }: any) {
    const userAgent = user.agent || user.op;
    if (!this.ctx.instance || !user.provider || !userAgent) return null;
    return `authToken:${this.ctx.instance.id}:${userAgent.id}:${user.provider.scene || ''}:${user.provider.id}`;
  }

  _getAuthRedisKeyPattern({ user, keyPrefix }: any) {
    return `${keyPrefix}authToken:${this.ctx.instance.id}:${user.id}:*`;
  }

  _pruneUser({ user }: any) {
    const _user: any = {
      op: { id: user.op.id, iid: user.op.iid, anonymous: user.op.anonymous },
    };
    if (user.agent && user.agent.id !== user.op.id) {
      _user.agent = { id: user.agent.id, iid: user.agent.iid, anonymous: user.agent.anonymous };
    }
    if (user.provider) {
      _user.provider = user.provider;
    }
    return _user;
  }

  async serializeUser({ user }: any) {
    // _user
    const _user: any = this._pruneUser({ user });
    // anonymous
    if (user.op.anonymous) {
      // not use redis
      return _user;
    }
    // save to redis
    const key = this._getAuthRedisKey({ user })!;
    if (!this.app.bean.util.checkDemo(false)) {
      // demo, allowed to auth more times
      _user.token = await this.redisAuth.get(key);
    } else {
      // create a new one
      _user.token = null;
    }
    if (!_user.token) {
      _user.token = this.app.bean.util.uuidv4();
    }
    await this.redisAuth.set(key, _user.token, 'PX', this.ctx.session.maxAge);
    // register user online
    await this.app.bean.userOnline.register({ user, isLogin: true });
    // ok
    return _user;
  }

  async deserializeUser({ user }: any) {
    if (user.op.anonymous) return user;
    // not throw 401: this.app.throw(401);
    if (!user.token) return null;
    // check token
    const key = this._getAuthRedisKey({ user });
    if (!key) return null;
    const token = await this.redisAuth.get(key);
    if (token !== user.token) return null;
    // ready
    return user;
  }

  async _sendMessageSystemLogout({ user }: any) {
    if (!user || user.op.anonymous) return;
    // send message-system
    await this.app.bean.userOnline.sendMessageSystemLogout({
      user: user.op, // should use user.op
      type: 'provider',
      provider: user.provider,
    });
  }

  async _clearRedisAuth({ user }: any) {
    if (!user || user.agent.anonymous) return;
    // redis auth
    const key = this._getAuthRedisKey({ user });
    if (key) {
      await this.redisAuth.del(key);
    }
  }

  async _clearRedisAuthAll({ user }: any) {
    const keyPrefix = this.redisAuth.options.keyPrefix;
    const keyPattern = this._getAuthRedisKeyPattern({ user, keyPrefix });
    const keys = await this.redisAuth.keys(keyPattern);
    for (const fullKey of keys) {
      const key = keyPrefix ? fullKey.substr(keyPrefix.length) : fullKey;
      await this.redisAuth.del(key);
    }
  }
}
