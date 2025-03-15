import type { PowerPartial } from 'vona';
import type { TableIdentity } from 'vona-module-a-database';
import type { IPassport } from 'vona-module-home-user';
import type { EntityAuthProvider } from '../entity/authProvider.ts';
import type { IAuthenticateOptions, IAuthenticateState, IAuthUserProfile } from '../types/auth.ts';
import type { IAuthProviderClientOptions, IAuthProviderExecute, IAuthProviderRecord } from '../types/authProvider.ts';
import { BeanBase, deepExtend } from 'vona';
import { Bean } from 'vona-module-a-bean';

@Bean()
export class BeanAuth extends BeanBase {
  async authenticate<T extends keyof IAuthProviderRecord>(
    authProviderName: T,
    options?: IAuthenticateOptions<IAuthProviderRecord[T]>,
  ) {
    // clientName
    const clientName = options?.clientName ?? 'default';
    // onionSlice
    const onionSlice = this.bean.onion.authProvider.getOnionSliceEnabled(authProviderName);
    if (!onionSlice) throw new Error(`Auth provider not found: ${authProviderName}`);
    // authProvider
    const entityAuthProvider = await this.scope.model.authProvider.get({ providerName: authProviderName, clientName });
    if (!entityAuthProvider || entityAuthProvider?.disabled) return this.app.throw(403);
    // clientOptions
    const optionsMeta = onionSlice.beanOptions.options;
    const clientOptions = deepExtend(
      {},
      optionsMeta?.default,
      optionsMeta?.clients?.[clientName as any],
      entityAuthProvider.clientOptions,
      options?.clientOptions,
    );
    // execute
    const beanAuthProvider = this.app.bean._getBean<IAuthProviderExecute>(onionSlice.beanOptions.beanFullName as any);
    const profileUser = await beanAuthProvider.execute(clientOptions!, onionSlice.beanOptions.options!);
    // issuePassport
    await this.issuePassport(profileUser, entityAuthProvider, clientOptions, options?.state);
    console.log(onionSlice);
  }

  async issuePassport(
    profileUser: IAuthUserProfile,
    entityAuthProvider: EntityAuthProvider,
    clientOptions: IAuthProviderClientOptions,
    state?: IAuthenticateState,
  ) {
    // stateIntention
    const stateIntention = state?.intention || 'login';
    // passport
    const passport: IPassport = {};
    // check if auth exists
    const authProviderId = entityAuthProvider.id;
    const profileId = profileUser.id;
    const entityAuth = await this.scope.model.auth.get({
      authProviderId,
      profileId,
    });
    // auth
    let authId: TableIdentity;
    let authUserId: TableIdentity;
    if (entityAuth) {
      authId = entityAuth.id;
      authUserId = entityAuth.userId;
    } else {
      if (stateIntention === 'migrate') {
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
