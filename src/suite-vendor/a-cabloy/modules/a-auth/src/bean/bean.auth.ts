import type { PowerPartial } from 'vona';
import type { IAuthenticateOptions } from '../types/auth.ts';
import type { IAuthProviderExecute, IAuthProviderRecord } from '../types/authProvider.ts';
import { BeanBase, deepExtend } from 'vona';
import { Bean } from 'vona-module-a-bean';

@Bean()
export class BeanAuth extends BeanBase {
  async authenticate<T extends keyof IAuthProviderRecord>(
    authProviderName: T,
    options?: PowerPartial<IAuthenticateOptions<IAuthProviderRecord[T]>>,
  ) {
    // onionSlice
    const onionSlice = this.bean.onion.authProvider.getOnionSliceEnabled(authProviderName);
    if (!onionSlice) throw new Error(`Auth provider not found: ${authProviderName}`);
    // clientOptions
    const clientOptions = await this._prepareClientOptions(onionSlice.beanOptions.options! as any, options);
    // execute
    const beanAuthProvider = this.app.bean._getBean<IAuthProviderExecute>(onionSlice.beanOptions.beanFullName as any);
    await beanAuthProvider.execute(clientOptions!, onionSlice.beanOptions.options!);
    console.log(onionSlice);
  }

  private async _prepareClientOptions<T extends keyof IAuthProviderRecord>(
    optionsMeta: PowerPartial<IAuthProviderRecord[T]>,
    options?: PowerPartial<IAuthenticateOptions<IAuthProviderRecord[T]>>,
  ): Promise<IAuthProviderRecord[T]['default']> {
    const clientName = options?.clientName ?? 'default';
    // todo: 从数据库中获取options
    const clientOptions = deepExtend({}, optionsMeta.default, optionsMeta.clients?.[clientName as any], options?.clientOptions);
    return clientOptions;
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
        this.self.scope.error.TheAuthShouldBeEnabled.throw();
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
    await this.self.scope.event.userVerify.emit({ verifyUser, profileUser });

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
}
