import type { IJwtToken } from 'vona-module-a-jwt';
import type { IAuthUserProfile, IPassportBase, IUserBase } from 'vona-module-a-user';
import type { EntityAuthProvider } from '../entity/authProvider.ts';
import type { IAuthenticateOptions, IAuthenticateState } from '../types/auth.ts';
import type { IAuthProviderClientOptions, IAuthProviderExecute, IAuthProviderRecord } from '../types/authProvider.ts';
import { BeanBase, deepExtend } from 'vona';
import { Bean } from 'vona-module-a-bean';
import { TableIdentity } from 'vona-module-a-database';

@Bean()
export class BeanAuth extends BeanBase {
  async authenticate<T extends keyof IAuthProviderRecord>(
    authProviderName: T,
    options?: IAuthenticateOptions<IAuthProviderRecord[T]>,
  ): Promise<IJwtToken> {
    // clientName
    const clientName = options?.clientName ?? 'default';
    // onionSlice
    const onionSlice = this.bean.onion.authProvider.getOnionSliceEnabled(authProviderName);
    if (!onionSlice) throw new Error(`Auth provider not found: ${authProviderName}`);
    // authProvider
    const [module, providerName] = authProviderName.split(':');
    const entityAuthProvider = await this.bean.authProvider.get({ module, providerName, clientName });
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
    const passport = await this.issuePassport(profileUser, entityAuthProvider, clientOptions, options?.state);
    // signin
    const jwtToken = await this.bean.passport.signin(passport);
    return jwtToken;
  }

  async issuePassport(
    profileUser: IAuthUserProfile,
    entityAuthProvider: EntityAuthProvider,
    clientOptions: IAuthProviderClientOptions,
    state?: IAuthenticateState,
  ): Promise<IPassportBase> {
    // event: issuePassport
    return await this.scope.event.issuePassport.emit(
      { profileUser, entityAuthProvider, clientOptions, state },
      async ({ profileUser, entityAuthProvider, clientOptions, state }) => {
        return await this._issuePassportInner(profileUser, entityAuthProvider, clientOptions, state);
      },
    );
  }

  private async _issuePassportInner(
    profileUser: IAuthUserProfile,
    entityAuthProvider: EntityAuthProvider,
    _clientOptions: IAuthProviderClientOptions,
    state?: IAuthenticateState,
  ): Promise<IPassportBase> {
    // stateIntention
    const stateIntention = state?.intention || 'login';
    const authProviderId = entityAuthProvider.id;
    const profileId = profileUser.id;
    // passport
    const passport: IPassportBase = {};
    // auth
    let entityAuth = await this.scope.model.auth.get({ authProviderId, profileId });
    if (!entityAuth) {
      if (stateIntention === 'migrate') {
        return this.scope.error.TheAuthShouldBeEnabled.throw();
      }
      // create new auth
      entityAuth = await this.scope.model.auth.insert({
        authProviderId,
        profileId,
        profile: JSON.stringify(profileUser),
      });
    }
    // passport.auth ready
    passport.auth = entityAuth;
    // user
    if (stateIntention === 'migrate') {
      // should check user so as to create this current passport
      await this.bean.passport.checkAuthToken();
      const userCurrent = this.bean.passport.getCurrentUser();
      if (!userCurrent) return this.app.throw(401);
      // migrate
      if (TableIdentity.isNotEqual(entityAuth.userId, userCurrent.id)) {
        await this.accountMigration(userCurrent.id, entityAuth.userId);
      }
      // user
      const user = await this.bean.userInner.get({ id: entityAuth.userId });
      // ready
      passport.user = user;
    } else if (stateIntention === 'associate') {
      // should check user so as to create this current passport
      await this.bean.passport.checkAuthToken();
      const userCurrent = this.bean.passport.getCurrentUser();
      if (!userCurrent) return this.app.throw(401);
      // associated
      // force update auth's userId, maybe different
      if (TableIdentity.isNotEqual(entityAuth.userId, userCurrent.id)) {
        // accountMigration / update
        if (entityAuth.userId) {
          await this.accountMigration(entityAuth.userId, userCurrent.id);
          entityAuth.userId = userCurrent.id;
        } else {
          // delete old record
          await this.scope.model.auth.delete({
            authProviderId,
            userId: userCurrent.id,
          });
          await this.scope.model.auth.update({
            id: entityAuth.id,
            userId: userCurrent.id,
          });
          entityAuth.userId = userCurrent.id;
        }
      }
      // ready
      passport.user = userCurrent;
    } else if (stateIntention === 'login') {
      // check if user exists
      let entityUser: IUserBase | undefined;
      if (entityAuth.userId) {
        entityUser = await this.bean.userInner.get({ id: entityAuth.userId });
      }
      if (!entityUser) {
        // add user
        entityUser = await this.bean.userInner.createByProfile(profileUser);
        // update auth's userId
        await this.scope.model.auth.update({
          id: entityAuth.id,
          userId: entityUser.id,
        });
        entityAuth.userId = entityUser.id;
      }
      // ready
      passport.user = entityUser;
    }
    // ok
    return passport;
  }

  async accountMigration(userIdFrom: TableIdentity, userIdTo: TableIdentity) {
    return await this.scope.event.accountMigration.emit({ userIdFrom, userIdTo }, async ({ userIdFrom, userIdTo }) => {
      return await this._accountMigrationInner(userIdFrom, userIdTo);
    });
  }

  private async _accountMigrationInner(userIdFrom: TableIdentity, userIdTo: TableIdentity) {
    // aAuth: delete old records
    const list = await this.scope.model.auth.select({
      where: {
        userId: userIdFrom,
      },
    });
    for (const item of list) {
      await this.scope.model.auth.delete({
        userId: userIdTo,
        authProviderId: item.authProviderId,
      });
    }
    // aAuth: update records
    await this.scope.model.auth.update(
      {
        userId: userIdTo,
      },
      {
        where: {
          userId: userIdFrom,
        },
      },
    );
    // delete user
    await this.bean.userInner.delete({ id: userIdFrom });
  }
}
