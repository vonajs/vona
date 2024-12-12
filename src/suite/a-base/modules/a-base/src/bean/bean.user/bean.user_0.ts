import { cast } from 'vona';
import { __ThisModule__ } from '../../.metadata/this.js';
import { BeanBase } from 'vona';
import { BeanUser } from '../bean.user.js';

const _usersAnonymous: any = {};

export class BeanUser0 extends BeanBase {
  get self() {
    return cast<BeanUser>(this);
  }

  get model() {
    return this.scope.model.user;
  }

  get modelUser() {
    return this.scope.model.user;
  }

  get modelUserAgent() {
    return this.scope.model.userAgent;
  }

  get modelUserRole() {
    return this.scope.model.userRole;
  }

  get modelAuth() {
    return this.$scope.auth.model.auth;
  }

  get modelAuthProvider() {
    return this.$scope.auth.model.authProvider;
  }

  get sequence() {
    return this.scope._bean.sequence;
  }

  get config() {
    return this.scope.config;
  }

  get sqlProcedure() {
    return this.scope.service.procedure;
  }

  async anonymous() {
    // cache
    let _userAnonymous = _usersAnonymous[this.ctx.instance.id];
    if (_userAnonymous) return _userAnonymous;
    // try get
    _userAnonymous = await this.self.get({ anonymous: 1 });
    if (_userAnonymous) {
      _usersAnonymous[this.ctx.instance.id] = _userAnonymous;
      return _userAnonymous;
    }
    // add user
    const userId = await this.self.add({ userName: 'anonymous', disabled: 0, anonymous: 1 });
    // addRole
    const role = await this.app.bean.role.getSystemRole({ roleName: 'anonymous' });
    await this.app.bean.role.addUserRole({ userId, roleId: role!.id });
    // ready
    _userAnonymous = await this.self.get({ id: userId });
    _usersAnonymous[this.ctx.instance.id] = _userAnonymous;
    return _userAnonymous;
  }

  async loginAsAnonymous() {
    const userOp = await this.anonymous();
    const user = {
      op: userOp,
      agent: userOp,
      provider: null,
    };
    // login
    await this.app.bean.auth.login(user);
    // maxAge
    const maxAge = this.config.auth.maxAge.anonymous;
    this.ctx.session.maxAge = maxAge;
    // ok
    return user;
  }

  anonymousId() {
    let _anonymousId = this.ctx.cookies.get('anonymous', { encrypt: true });
    if (!_anonymousId) {
      _anonymousId = this.app.bean.util.uuidv4();
      const maxAge = this.config.auth.maxAge.anonymous;
      this.ctx.cookies.set('anonymous', _anonymousId, { encrypt: true, maxAge });
    }
    return _anonymousId;
  }

  async check(options?) {
    // options
    const checkUser = options && options.user;
    // check if has this.ctx.state.user
    if (this.ctx.state.user) {
      // force set this.ctx.req.user
      (<any>this.ctx.req).user = this.app.bean.auth._pruneUser({ user: this.ctx.state.user });
    } else {
      // always has anonymous id
      this.app.bean.user.anonymousId();
      // check if has this.ctx.user
      if (!this.ctx.user || !this.ctx.user.op || this.ctx.user.op.iid !== this.ctx.instance.id) {
        // anonymous
        await this.app.bean.user.loginAsAnonymous();
      } else {
        this.ctx.state.user = await this._check_getStateUser({ ctxUser: this.ctx.user });
      }
    }
    // check user
    if (checkUser && this.ctx.state.user.op.anonymous) this.app.throw(401);
  }

  async _check_getStateUser({ ctxUser }: any) {
    // state
    const stateUser: any = {
      provider: ctxUser.provider,
    };
    // check if deleted,disabled,agent
    const userOp = await this.self.get({ id: ctxUser.op.id });
    // deleted
    if (!userOp) {
      // this.scope.error.UserDoesNotExist.throw();
      this.app.throw(401);
    }
    // disabled
    if (userOp!.disabled) this.scope.error.UserIsDisabled.throw();
    // hold user
    stateUser.op = userOp;
    // agent
    let userAgent;
    if (ctxUser.agent && ctxUser.agent.id !== ctxUser.op.id) {
      userAgent = await this.agent({ userId: ctxUser.op.id });
      if (!userAgent) {
        // this.scope.error.AgentUserDoesNotExist.throw();
        this.app.throw(401);
      }
      if (userAgent.id !== ctxUser.agent.id) this.scope.error.AgentUserDoesNotExist.throw();
      if (userAgent.disabled) this.scope.error.UserIsDisabled.throw();
    } else {
      userAgent = userOp;
    }
    // hold agent
    stateUser.agent = userAgent;
    // only check locale for agent
    // not set locale for test env
    const checkDemo = this.app.bean.util.checkDemo(false);
    if (checkDemo && !userAgent.locale && this.ctx.locale && !this.ctx.app.meta.isTest) {
      // set
      const userData = { id: userAgent.id, locale: this.ctx.locale };
      await this.self.save({ user: userData });
      userAgent.locale = this.ctx.locale;
    } else if (!checkDemo && userAgent.locale) {
      // clear
      const userData = { id: userAgent.id, locale: null };
      await this.self.save({ user: userData });
      userAgent.locale = null;
    }
    // ok
    return stateUser;
  }

  async setActivated({ user, autoActivate }: any) {
    // save
    if (user.activated !== undefined) delete user.activated;
    await this.self.save({ user });
    // tryActivate
    const tryActivate = autoActivate || user.emailConfirmed || user.mobileVerified;
    if (tryActivate) {
      await this.userRoleStageActivate({ userId: user.id });
    }
  }

  async userRoleStageAdd({ userId }: any) {
    // roleNames
    let roleNames: any = this.config.account.needActivation ? 'registered' : this.config.account.activatedRoles;
    roleNames = roleNames.split(',');
    for (const roleName of roleNames) {
      const role = await this.app.bean.role.parseRoleName({ roleName });
      await this.app.bean.role.addUserRole({ userId, roleId: role.id });
    }
  }

  async userRoleStageActivate({ userId }: any) {
    // get
    const user = await this.self.get({ id: userId });
    if (!user) return;
    // only once
    if (user.activated) return;
    // adjust role
    if (this.config.account.needActivation) {
      // userRoles
      const userRoles = await this.app.bean.role.getUserRolesDirect({ userId });
      // userRolesMap
      const map: any = {};
      for (const role of userRoles) {
        map[role.roleName] = role;
      }
      // remove from registered
      if (map.registered) {
        const roleRegistered = await this.app.bean.role.getSystemRole({ roleName: 'registered' });
        await this.app.bean.role.deleteUserRole({ userId, roleId: roleRegistered!.id });
      }
      // add to activated
      const rolesActivated = await this.app.bean.role.parseRoleNames({ roleNames: this.config.account.activatedRoles });
      for (const role of rolesActivated) {
        if (!map[role.roleName]) {
          await this.app.bean.role.addUserRole({ userId, roleId: role.id });
        }
      }
    }
    // set activated
    await this.self.save({
      user: { id: userId, activated: 1 },
    });
  }

  async agent({ userId }: any) {
    const items = await this.modelUser.select({
      alias: 'a',
      joins: [['leftJoin', 'aUserAgent as b', { 'a.id': 'b.userIdAgent' }]],
      where: {
        'b.userId': userId,
      },
    });
    return items[0];
  }

  async agentsBy({ userId }: any) {
    const items = await this.modelUser.select({
      alias: 'a',
      joins: [['leftJoin', 'aUserAgent as b', { 'a.id': 'b.userId' }]],
      where: {
        'b.userIdAgent': userId,
      },
    });
    return items;
  }

  async addAgent({ userIdAgent, userId }: any) {
    await this.modelUserAgent.insert({
      userIdAgent,
      userId,
    });
  }

  async removeAgent({ userIdAgent, userId }: any) {
    await this.modelUserAgent.delete({
      userIdAgent,
      userId,
    });
  }

  async switchAgent({ userIdAgent }: any) {
    const op = this.ctx.user.op;
    let _user = await this.self.get({ id: userIdAgent });
    if (!_user) this.app.throw(403);
    _user = _user!;
    this.ctx.user.op = { id: _user.id, iid: _user.iid, anonymous: _user.anonymous };
    try {
      await this.check();
      await this.app.bean.auth.login(this.ctx.state.user);
      return this.ctx.state.user;
    } catch (err) {
      this.ctx.user.op = op;
      throw err;
    }
  }

  async switchOffAgent() {
    return await this.switchAgent({ userIdAgent: this.ctx.state.user.agent!.id });
  }

  // state: login/associate/migrate
  async verify({ state = 'login', profileUser }: any) {
    if (state === 'migrate' || state === 'associate') {
      this.app.bean.util.checkDemo();
    }

    // verifyUser
    const verifyUser: any = {};

    // provider
    const providerItem = await this.app.bean.authProvider.getAuthProvider({
      module: profileUser.module,
      providerName: profileUser.provider,
    });

    // check if auth exists
    const providerId = providerItem.id;
    const providerScene = profileUser.providerScene || null;
    const profileId = profileUser.profileId;
    const authItem = await this.modelAuth.get({
      providerId,
      providerScene,
      profileId,
    });
    // avatar
    await this._prepareAvatar({ authItem, profile: profileUser.profile });
    // auth
    let authId;
    let authUserId;
    if (authItem) {
      authId = authItem.id;
      authUserId = authItem.userId;
      // update profile
      const _profile = JSON.stringify(profileUser.profile);
      if (authItem.profile !== _profile) {
        await this.modelAuth.update({
          id: authId,
          profile: _profile,
        });
      }
    } else {
      if (state === 'migrate' || profileUser.authShouldExists === true) {
        this.scope.error.TheAuthShouldBeEnabled.throw();
      }
      // add
      const _profile = JSON.stringify(profileUser.profile);
      const res = await this.modelAuth.insert({
        providerId,
        providerScene,
        profileId,
        profile: _profile,
      });
      authId = res[0];
    }
    // provider ready
    verifyUser.provider = {
      id: authId,
      providerId,
      module: profileUser.module,
      providerName: profileUser.provider,
      // profile: profileUser.profile,  // maybe has private info
    };
    if (providerScene) {
      verifyUser.provider.providerScene = providerScene;
    }
    const scene = this.app.bean.util.getFrontScene();
    if (scene) {
      verifyUser.provider.scene = scene;
    }

    // columns
    const columns = ['userName', 'realName', 'email', 'mobile', 'avatar', 'motto', 'locale'];

    //
    let userId;
    if (state === 'migrate') {
      // should check user so as to create this.ctx.state.user
      await this.check();
      // check if this.ctx.state.user exists
      if (!this.ctx.state.user || this.ctx.state.user.agent!.anonymous) return false;
      userId = this.ctx.state.user.agent!.id;
      // migrate
      if (authUserId !== userId) {
        await this.accountMigration({ userIdFrom: userId, userIdTo: authUserId });
      }
      // user
      const user = await this.model.get({ id: authUserId });
      // ready
      verifyUser.op = user;
      verifyUser.agent = user;
    } else if (state === 'associate') {
      // should check user so as to create this.ctx.state.user
      await this.check();
      // check if this.ctx.state.user exists
      if (!this.ctx.state.user || this.ctx.state.user.agent!.anonymous) return false;
      userId = this.ctx.state.user.agent!.id;
      // associated
      // update user
      await this._updateUserInfo(userId, profileUser.profile, columns);
      // force update auth's userId, maybe different
      if (authUserId !== userId) {
        // accountMigration / update
        if (authUserId) {
          await this.accountMigration({ userIdFrom: authUserId, userIdTo: userId });
        } else {
          // delete old record
          await this.modelAuth.delete({
            providerId,
            providerScene,
            userId,
          });
          await this.modelAuth.update({
            id: authId,
            userId,
          });
        }
      }
      // ready
      verifyUser.op = this.ctx.state.user.op;
      verifyUser.agent = this.ctx.state.user.agent;
    } else if (state === 'login') {
      // check if user exists
      let user;
      if (authUserId) {
        user = await this.model.get({ id: authUserId });
      }
      if (user) {
        // check if disabled
        if (user.disabled) return false;
        // update user
        await this._updateUserInfo(user.id, profileUser.profile, columns);
        userId = user.id;
      } else {
        // add user
        userId = await this._addUserInfo(profileUser.profile, columns, profileUser.autoActivate);
        user = await this.model.get({ id: userId });
        // update auth's userId
        await this.modelAuth.update({
          id: authId,
          userId,
        });
      }
      // ready
      verifyUser.op = user;
      verifyUser.agent = user;
    }

    // user verify event
    await this.app.bean.event.invoke({
      module: __ThisModule__,
      name: 'userVerify',
      data: { verifyUser, profileUser },
    });

    // restore maxAge
    //   maxAge: 0,null/undefined,>0
    if (this.ctx.session) {
      if (profileUser.maxAge === 0) {
        this.ctx.session.maxAge = this.config.auth.maxAge.default;
      } else {
        this.ctx.session.maxAge = profileUser.maxAge || this.config.auth.maxAge.authenticated;
      }
    }

    // ok
    return verifyUser;
  }

  async accountMigration({ userIdFrom, userIdTo }: any) {
    // accountMigration event
    await this.app.bean.event.invoke({
      module: __ThisModule__,
      name: 'accountMigration',
      data: { userIdFrom, userIdTo },
    });
    // aAuth: delete old records
    const list = await this.modelAuth.select({
      where: {
        userId: userIdFrom,
      },
    });
    for (const item of list) {
      await this.modelAuth.delete({
        userId: userIdTo,
        providerId: item.providerId,
        providerScene: item.providerScene,
      });
    }
    // aAuth: update records
    await this.modelAuth.update(
      {
        userId: userIdTo,
      },
      {
        where: {
          userId: userIdFrom,
        },
      },
    );
    // aUserRole
    await this.modelUserRole.update(
      {
        userId: userIdTo,
      },
      { where: { userId: userIdFrom } },
    );
    // delete user
    await this.self.delete({ userId: userIdFrom });
  }

  async _downloadAvatar({ avatar }: any) {
    const timeout = this.config.auth.avatar.timeout;
    let res;
    try {
      res = await this.ctx.curl(avatar, { method: 'GET', timeout });
    } catch (_err) {
      res = await this.ctx.curl(this.config.auth.avatar.default, { method: 'GET', timeout });
    }
    return res;
  }

  async _prepareAvatar({ authItem, profile }: any) {
    // maybe failed for image format invalid
    try {
      // avatar
      let avatarOld;
      let _avatarOld;
      if (authItem) {
        const _profile = JSON.parse(authItem.profile);
        avatarOld = _profile.avatar;
        _avatarOld = _profile._avatar;
      }
      if (!profile.avatar || profile.avatar === avatarOld) {
        profile._avatar2 = _avatarOld;
        return;
      }
      // download image
      const res = await this._downloadAvatar({ avatar: profile.avatar });
      // meta
      const mime = res.headers['content-type'] || '';
      const ext = mime.split('/')[1] || '';
      const meta = {
        filename: `user-avatar.${ext}`,
        encoding: '7bit',
        mime,
        fields: {
          mode: 1,
          flag: `user-avatar:${profile.avatar}`,
        },
      };
      // upload
      try {
        const res2 = await this.app.bean.file._upload({
          fileContent: res.data,
          meta,
          user: null,
        });
        // hold
        profile._avatar = res2.downloadUrl;
      } catch (_err) {
        console.log('-------- avatar:', profile.avatar);
        // console.log(res);
        // console.log(err);
      }
    } catch (err) {
      // not throw err
      console.log(err);
    }
  }

  async _addUserInfo(profile, columns, autoActivate) {
    const user: any = {};
    for (const column of columns) {
      // others
      await this._setUserInfoColumn(user, column, profile);
    }
    // add user
    const userId = await this.self.add(user);
    // add role
    await this.userRoleStageAdd({ userId });
    // try setActivated
    const data: any = { id: userId };
    // emailConfirmed
    if (profile.emailConfirmed && profile.email) {
      data.emailConfirmed = 1;
    }
    // mobileVerified
    if (profile.mobileVerified && profile.mobile) {
      data.mobileVerified = 1;
    }
    // setActivated
    await this.setActivated({ user: data, autoActivate });
    // ok
    return userId;
  }

  async _updateUserInfo(userId, profile, columns) {
    const users = await this.model.select({
      where: { id: userId },
      columns,
    });
    const user = users[0];
    for (const column of columns) {
      await this._setUserInfoColumn(user, column, profile);
    }
    user.id = userId;
    await this.self.save({ user });
  }

  async _setUserInfoColumn(user, column, profile) {
    // avatar / only if empty
    if (column === 'avatar') {
      const value = profile._avatar || profile._avatar2;
      if (!user[column] && value) {
        user[column] = value;
      }
      delete profile._avatar2;
      return;
    }
    // // avatar / if empty
    // if (column === 'avatar' && !user[column] && profile._avatar2) {
    //   user[column] = profile._avatar2;
    //   return;
    // }
    // // avatar / if changed
    // if (column === 'avatar' && profile._avatar) {
    //   user[column] = profile._avatar;
    //   return;
    // }
    // value
    let value = profile[column];
    // only set when empty
    if (user[column] || !value) return;
    // userName
    if (column === 'userName') {
      const res = await this.self.exists({ [column]: value });
      if (res) {
        // sequence
        const sequence = await this.sequence.next('userName');
        value = `${value}__${sequence}`;
      }
    } else if (column === 'email' || column === 'mobile') {
      const res = await this.self.exists({ [column]: value });
      if (res) {
        value = null;
      }
    }
    if (value) {
      user[column] = value;
    }
  }
}
