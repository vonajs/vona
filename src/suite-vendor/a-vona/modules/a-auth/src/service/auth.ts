import type { IAuthUserProfile, IPassportBase, IUserBase } from 'vona-module-a-user';
import type { EntityAuthProvider } from '../entity/authProvider.ts';
import type { IAuthenticateStrategyState } from '../types/auth.ts';
import type { IAuthProviderClientOptions, IAuthProviderVerify, IDecoratorAuthProviderOptions, TypeStrategyVerifyArgs } from '../types/authProvider.ts';
import { isNil } from '@cabloy/utils';
import { TableIdentity } from 'table-identity';
import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-bean';

@Service()
export class ServiceAuth extends BeanBase {
  async authenticateCallback(
    entityAuthProvider: EntityAuthProvider,
    beanAuthProvider: IAuthProviderVerify,
    clientOptions: IAuthProviderClientOptions,
    onionOptions: IDecoratorAuthProviderOptions,
    state?: IAuthenticateStrategyState,
    strategyVerifyArgs?: TypeStrategyVerifyArgs,
  ) {
    const profileUser = await beanAuthProvider.verify(strategyVerifyArgs ?? [], clientOptions, onionOptions, state);
    // confirmed
    if (isNil(profileUser.confirmed)) profileUser.confirmed = clientOptions.confirmed;
    // issuePassport
    const passport = await this.issuePassport(profileUser, entityAuthProvider, clientOptions, state);
    // signin
    const jwtToken = await this.bean.passport.signin(passport, { authToken: 'recreate' });
    return jwtToken;
  }

  async issuePassport(
    profileUser: IAuthUserProfile,
    entityAuthProvider: EntityAuthProvider,
    clientOptions: IAuthProviderClientOptions,
    state?: IAuthenticateStrategyState,
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
    state?: IAuthenticateStrategyState,
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
      const userCurrent = await this._checkAuthTokenAndReturnCurrentUser(state?.accessToken);
      // migrate
      if (TableIdentity.isNotEqual(entityAuth.userId, userCurrent.id)) {
        await this.accountMigration(userCurrent.id, entityAuth.userId);
      }
      // user
      const user = await this.bean.userInner.findOne({ id: entityAuth.userId });
      // ready
      passport.user = user;
    } else if (stateIntention === 'associate') {
      // should check user so as to create this current passport
      const userCurrent = await this._checkAuthTokenAndReturnCurrentUser(state?.accessToken);
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
    } else if (stateIntention === 'login' || stateIntention === 'register') {
      // check if user exists
      let entityUser: IUserBase | undefined;
      if (entityAuth.userId) {
        entityUser = await this.bean.userInner.findOne({ id: entityAuth.userId });
      }
      if (!entityUser) {
        // register user
        entityUser = await this.bean.userInner.registerByProfile(profileUser);
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

  private async _checkAuthTokenAndReturnCurrentUser(accessToken?: string) {
    if (accessToken) {
      await this.bean.passport.checkAuthToken(accessToken, 'oauth');
    }
    const userCurrent = this.bean.passport.getCurrentUser();
    if (!userCurrent) return this.app.throw(401);
    return userCurrent;
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
    // remove user
    await this.bean.userInner.remove({ id: userIdFrom });
  }
}
