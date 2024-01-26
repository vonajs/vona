import { BeanBase } from '@cabloy/core';

const _usersAnonymous = {};

export class BeanUser0 extends BeanBase {
  constructor() {
    this._sequence = null;
    this._config = null;
  }

  get model() {
    return this.ctx.model.module().user;
  }

  get modelAgent() {
    return this.ctx.model.module().userAgent;
  }

  get modelAuth() {
    return this.ctx.model.module().auth;
  }

  get modelAuthProvider() {
    return this.ctx.model.module().authProvider;
  }

  get sequence() {
    if (!this._sequence) this._sequence = this.ctx.bean.sequence.module();
    return this._sequence;
  }

  get config() {
    if (!this._config) this._config = this.ctx.config.module();
    return this._config;
  }

  get sqlProcedure() {
    return this.ctx.bean._getBean('a-base.local.procedure');
  }

  async anonymous() {
    // cache
    let _userAnonymous = _usersAnonymous[this.ctx.instance.id];
    if (_userAnonymous) return _userAnonymous;
    // try get
    _userAnonymous = await this.get({ anonymous: 1 });
    if (_userAnonymous) {
      _usersAnonymous[this.ctx.instance.id] = _userAnonymous;
      return _userAnonymous;
    }
    // add user
    const userId = await this.add({ userName: 'anonymous', disabled: 0, anonymous: 1 });
    // addRole
    const role = await this.ctx.bean.role.getSystemRole({ roleName: 'anonymous' });
    await this.ctx.bean.role.addUserRole({ userId, roleId: role.id });
    // ready
    _userAnonymous = await this.get({ id: userId });
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
    await this.ctx.bean.auth.login(user);
    // maxAge
    const maxAge = this.config.auth.maxAge.anonymous;
    this.ctx.session.maxAge = maxAge;
    // ok
    return user;
  }

  anonymousId() {
    let _anonymousId = this.ctx.cookies.get('anonymous', { encrypt: true });
    if (!_anonymousId) {
      _anonymousId = this.ctx.bean.util.uuidv4();
      const maxAge = this.config.auth.maxAge.anonymous;
      this.ctx.cookies.set('anonymous', _anonymousId, { encrypt: true, maxAge });
    }
    return _anonymousId;
  }

  async check(options) {
    // options
    const checkUser = options && options.user;
    // check if has this.ctx.state.user
    if (this.ctx.state.user) {
      // force set this.ctx.req.user
      this.ctx.req.user = this.ctx.bean.auth._pruneUser({ user: this.ctx.state.user });
    } else {
      // always has anonymous id
      this.ctx.bean.user.anonymousId();
      // check if has this.ctx.user
      if (!this.ctx.user || !this.ctx.user.op || this.ctx.user.op.iid !== this.ctx.instance.id) {
        // anonymous
        await this.ctx.bean.user.loginAsAnonymous();
      } else {
        this.ctx.state.user = await this._check_getStateUser({ ctxUser: this.ctx.user });
      }
    }
    // check user
    if (checkUser && this.ctx.state.user.op.anonymous) this.ctx.throw(401);
  }

  async _check_getStateUser({ ctxUser }) {
    // state
    const stateUser = {
      provider: ctxUser.provider,
    };
    // check if deleted,disabled,agent
    const userOp = await this.get({ id: ctxUser.op.id });
    // deleted
    if (!userOp) {
      // this.ctx.throw.module(, 1004);
      this.ctx.throw(401);
    }
    // disabled
    if (userOp.disabled) this.ctx.throw.module(, 1005);
    // hold user
    stateUser.op = userOp;
    // agent
    let userAgent;
    if (ctxUser.agent && ctxUser.agent.id !== ctxUser.op.id) {
      userAgent = await this.agent({ userId: ctxUser.op.id });
      if (!userAgent) {
        // this.ctx.throw.module(, 1006);
        this.ctx.throw(401);
      }
      if (userAgent.id !== ctxUser.agent.id) this.ctx.throw.module(, 1006);
      if (userAgent.disabled) this.ctx.throw.module(, 1005);
    } else {
      userAgent = userOp;
    }
    // hold agent
    stateUser.agent = userAgent;
    // only check locale for agent
    // not set locale for test env
    const checkDemo = this.ctx.bean.util.checkDemo(false);
    if (checkDemo && !userAgent.locale && this.ctx.locale && !this.ctx.app.meta.isTest) {
      // set
      const userData = { id: userAgent.id, locale: this.ctx.locale };
      await this.save({ user: userData });
      userAgent.locale = this.ctx.locale;
    } else if (!checkDemo && userAgent.locale) {
      // clear
      const userData = { id: userAgent.id, locale: null };
      await this.save({ user: userData });
      userAgent.locale = null;
    }
    // ok
    return stateUser;
  }

  async setActivated({ user, autoActivate }) {
    // save
    if (user.activated !== undefined) delete user.activated;
    await this.save({ user });
    // tryActivate
    const tryActivate = autoActivate || user.emailConfirmed || user.mobileVerified;
    if (tryActivate) {
      await this.userRoleStageActivate({ userId: user.id });
    }
  }

  async userRoleStageAdd({ userId }) {
    // roleNames
    let roleNames = this.config.account.needActivation ? 'registered' : this.config.account.activatedRoles;
    roleNames = roleNames.split(',');
    for (const roleName of roleNames) {
      const role = await this.ctx.bean.role.parseRoleName({ roleName });
      await this.ctx.bean.role.addUserRole({ userId, roleId: role.id });
    }
  }

  async userRoleStageActivate({ userId }) {
    // get
    const user = await this.get({ id: userId });
    // only once
    if (user.activated) return;
    // adjust role
    if (this.config.account.needActivation) {
      // userRoles
      const userRoles = await this.ctx.bean.role.getUserRolesDirect({ userId });
      // userRolesMap
      const map = {};
      for (const role of userRoles) {
        map[role.roleName] = role;
      }
      // remove from registered
      if (map.registered) {
        const roleRegistered = await this.ctx.bean.role.getSystemRole({ roleName: 'registered' });
        await this.ctx.bean.role.deleteUserRole({ userId, roleId: roleRegistered.id });
      }
      // add to activated
      const rolesActivated = await this.ctx.bean.role.parseRoleNames({ roleNames: this.config.account.activatedRoles });
      for (const role of rolesActivated) {
        if (!map[role.roleName]) {
          await this.ctx.bean.role.addUserRole({ userId, roleId: role.id });
        }
      }
    }
    // set activated
    await this.save({
      user: { id: userId, activated: 1 },
    });
  }

  async agent({ userId }) {
    const sql = `
        select a.* from aUser a
          left join aUserAgent b on a.id=b.userIdAgent
            where a.iid=? and a.deleted=0 and b.userId=?
      `;
    return await this.ctx.model.queryOne(sql, [this.ctx.instance.id, userId]);
  }

  async agentsBy({ userId }) {
    const sql = `
        select a.* from aUser a
          left join aUserAgent b on a.id=b.userId
            where a.iid=? and a.deleted=0 and b.userIdAgent=?
      `;
    return await this.ctx.model.query(sql, [this.ctx.instance.id, userId]);
  }

  async addAgent({ userIdAgent, userId }) {
    await this.modelAgent.insert({
      userIdAgent,
      userId,
    });
  }

  async removeAgent({ userIdAgent, userId }) {
    await this.modelAgent.delete({
      userIdAgent,
      userId,
    });
  }

  async switchAgent({ userIdAgent }) {
    const op = this.ctx.user.op;
    const _user = await this.get({ id: userIdAgent });
    this.ctx.user.op = { id: _user.id, iid: _user.iid, anonymous: _user.anonymous };
    try {
      await this.check();
      await this.ctx.bean.auth.login(this.ctx.state.user);
      return this.ctx.state.user;
    } catch (err) {
      this.ctx.user.op = op;
      throw err;
    }
  }

  async switchOffAgent() {
    return await this.switchAgent({ userIdAgent: this.ctx.state.user.agent.id });
  }

  // state: login/associate/migrate
  async verify({ state = 'login', profileUser }) {
    if (state === 'migrate' || state === 'associate') {
      this.ctx.bean.util.checkDemo();
    }

    // verifyUser
    const verifyUser = {};

    // provider
    const providerItem = await this.ctx.bean.authProvider.getAuthProvider({
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
        this.ctx.throw.module(, 1009);
      }
      // add
      const _profile = JSON.stringify(profileUser.profile);
      const res = await this.modelAuth.insert({
        providerId,
        providerScene,
        profileId,
        profile: _profile,
      });
      authId = res.insertId;
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
    const scene = this.ctx.bean.util.getFrontScene();
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
      if (!this.ctx.state.user || this.ctx.state.user.agent.anonymous) return false;
      userId = this.ctx.state.user.agent.id;
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
      if (!this.ctx.state.user || this.ctx.state.user.agent.anonymous) return false;
      userId = this.ctx.state.user.agent.id;
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
    await this.ctx.bean.event.invoke({
      module: ,
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

  async accountMigration({ userIdFrom, userIdTo }) {
    // accountMigration event
    await this.ctx.bean.event.invoke({
      module: ,
      name: 'accountMigration',
      data: { userIdFrom, userIdTo },
    });
    // aAuth: delete old records
    const list = await this.ctx.model.query(
      'select a.id,a.providerId,a.providerScene from aAuth a where a.deleted=0 and a.iid=? and a.userId=?',
      [this.ctx.instance.id, userIdFrom],
    );
    for (const item of list) {
      await this.ctx.model.query(
        'delete from aAuth where deleted=0 and iid=? and userId=? and providerId=? and providerScene=?',
        [this.ctx.instance.id, userIdTo, item.providerId, item.providerScene],
      );
    }
    // aAuth: update records
    await this.ctx.model.query('update aAuth a set a.userId=? where a.deleted=0 and a.iid=? and a.userId=?', [
      userIdTo,
      this.ctx.instance.id,
      userIdFrom,
    ]);
    // aUserRole
    await this.ctx.model.query('update aUserRole a set a.userId=? where a.iid=? and a.userId=?', [
      userIdTo,
      this.ctx.instance.id,
      userIdFrom,
    ]);
    // delete user
    await this.delete({ userId: userIdFrom });
  }

  async _downloadAvatar({ avatar }) {
    const timeout = this.config.auth.avatar.timeout;
    let res;
    try {
      res = await this.ctx.curl(avatar, { method: 'GET', timeout });
    } catch (err) {
      res = await this.ctx.curl(this.config.auth.avatar.default, { method: 'GET', timeout });
    }
    return res;
  }

  async _prepareAvatar({ authItem, profile }) {
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
        const res2 = await this.ctx.bean.file._upload({
          fileContent: res.data,
          meta,
          user: null,
        });
        // hold
        profile._avatar = res2.downloadUrl;
      } catch (err) {
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
    const user = {};
    for (const column of columns) {
      // others
      await this._setUserInfoColumn(user, column, profile);
    }
    // add user
    const userId = await this.add(user);
    // add role
    await this.userRoleStageAdd({ userId });
    // try setActivated
    const data = { id: userId };
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
    await this.save({ user });
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
      const res = await this.exists({ [column]: value });
      if (res) {
        // sequence
        const sequence = await this.sequence.next('userName');
        value = `${value}__${sequence}`;
      }
    } else if (column === 'email' || column === 'mobile') {
      const res = await this.exists({ [column]: value });
      if (res) {
        value = null;
      }
    }
    if (value) {
      user[column] = value;
    }
  }
}
