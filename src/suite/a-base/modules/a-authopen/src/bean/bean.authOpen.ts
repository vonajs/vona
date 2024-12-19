import { Bean } from 'vona-module-a-bean';
import { __ThisModule__ } from '../.metadata/this.js';
import { BeanBase } from 'vona';

import randomize from 'randomatic';

const __atomClassRole = {
  module: 'a-base',
  atomClassName: 'role',
};
const __atomClassAuthOpen = {
  module: __ThisModule__,
  atomClassName: 'authOpen',
};

@Bean()
export class BeanAuthOpen extends BeanBase {
  get modelAuthOpen() {
    return this.scope.model.authOpen;
  }
  get modelResourceRole() {
    return this.$scope.base.model.resourceRole;
  }
  get localAuthSimple() {
    return this.$scope.authsimple.service.simple;
  }

  async hideClientSecret({ atomId, itemId, user }: any) {
    const item = await this._forceAuthOpen({ atomId, itemId });
    const clientSecret = await this.localAuthSimple.calcPassword({ password: item!.clientSecret });
    // use userId for safety
    await this.modelAuthOpen.update({
      id: itemId,
      userId: user.id,
      clientSecret,
      clientSecretHidden: 1,
    });
  }

  async resetClientSecret({ atomId, itemId, user }: any) {
    itemId = await this._forceAuthOpenId({ atomId, itemId });
    // clientSecret
    const clientSecret = randomize('0a', 40);
    // use userId for safety
    await this.modelAuthOpen.update({
      id: itemId,
      userId: user.id,
      clientSecret,
      clientSecretHidden: 0,
    });
  }

  async verify({ clientID, clientSecret }: any) {
    // authOpen
    const authOpen = await this.modelAuthOpen.get({ clientID });
    if (!authOpen) return this.app.throw(403);
    // clientSecret
    if (authOpen.clientSecretHidden) {
      const res = await this.localAuthSimple.verifyPassword({
        password: clientSecret,
        hash: authOpen.clientSecret,
      });
      if (!res) return this.app.throw(403);
    } else {
      if (clientSecret !== authOpen.clientSecret) return this.app.throw(403);
    }
    // atomDisabled
    const atom = await this.app.bean.atom.modelAtom.get({ id: authOpen.atomId });
    if (atom!.atomDisabled) return this.app.throw(403);
    // neverExpire/expireTime
    if (!authOpen.neverExpire && authOpen.expireTime.valueOf() <= Date.now()) {
      return this.scope.error.AuthOpenTokenExpired.throw();
    }
    // done
    return authOpen;
  }

  isAuthOpen() {
    const provider = this.app.bean.util.getProperty(this.ctx, 'state.user.provider');
    if (!provider) return false;
    return provider.module === 'a-authopen' && provider.providerName === 'authopen' ? provider : null;
  }

  async prepareAuthOpen() {
    const provider = this.isAuthOpen();
    if (!provider) return null; // not auth open provider
    const authOpen = await this.getAuthOpenByAuthId({ authId: provider.id });
    // check full
    if (authOpen.scopeRoleName === 'RoleScopeFull') return null;
    // ok
    return authOpen;
  }

  async checkRightResource({ resourceAtomId }: any) {
    // authOpen
    const authOpen = await this.prepareAuthOpen();
    if (!authOpen) return true;
    // check
    const right = await this.bean.model.get(
      'aViewRoleRightResource',
      {
        roleIdWho: authOpen.scopeRoleId,
        atomId: resourceAtomId,
      },
      { disableDeleted: true },
    );
    return !!right;
  }

  async checkRightAtomAction({ atomClass, action }: any) {
    // authOpen
    const authOpen = await this.prepareAuthOpen();
    if (!authOpen) return true;
    // parse action code
    action = this.app.bean.atomAction.parseActionCode({
      action,
      atomClass,
    });
    // check
    const right = await this.bean.model.get(
      'aViewRoleRightAtomClass',
      {
        roleIdWho: authOpen.scopeRoleId,
        atomClassId: atomClass.id,
        action,
      },
      { disableDeleted: true },
    );
    return !!right;
  }

  async getAuthOpenByAuthId({ authId }: any) {
    const authItem = await this.bean.auth.model.get({ id: authId });
    if (!authItem) return undefined;
    const item = await this.bean.model.get('aAuthOpenView', {
      id: parseInt(authItem.profileId),
    });
    return item;
  }

  async _forceAuthOpenId({ atomId, itemId }: any) {
    if (!itemId) {
      const item = await this.modelAuthOpen.get({ atomId });
      itemId = item!.id;
    }
    return itemId;
  }

  async _forceAuthOpen({ atomId, itemId }: any) {
    if (!itemId) {
      return await this.modelAuthOpen.get({ atomId });
    }
    return await this.modelAuthOpen.get({ id: itemId });
  }

  // create aAuthOpen record for user
  async createAuthOpen({ item: { atomName, scopeRoleName, neverExpire = 1, expireTime = null }, user }) {
    // write
    const scopeRole = await this.app.bean.role.parseRoleName({ roleName: scopeRoleName });
    const item = {
      atomName,
      scopeRoleId: scopeRole.id,
      neverExpire,
      expireTime,
    };
    const authOpenKey = await this.app.bean.atom.write({
      atomClass: __atomClassAuthOpen,
      item,
      user,
    });
    // ok
    return authOpenKey;
  }

  async createRoleScopes({ roleScopes, setDirty = true }: any) {
    //
    for (const roleScope of roleScopes) {
      // item
      const item = { ...roleScope };
      // roleIdParent
      if (roleScope.roleIdParent === 0) {
        item.roleIdParent = 0;
      } else {
        const role = await this.app.bean.role.parseRoleName({ roleName: roleScope.roleIdParent });
        item.roleIdParent = role.id;
      }
      // loadAtomStatic
      const atomKey = await this.app.bean.atomStatic.loadAtomStatic({
        moduleName: __ThisModule__,
        atomClass: __atomClassRole,
        item,
      });
      if (atomKey && roleScope._roleRightsRead) {
        // role rights read
        const roleName = roleScope._roleRightsRead;
        const scopeNames = [atomKey.itemId];
        const roleRights = [{ roleName, action: 'read', scopeNames }];
        await this.app.bean.role.addRoleRightBatch({
          module: 'a-base',
          atomClassName: 'role',
          roleRights,
        });
      }
    }
    // setDirty
    if (setDirty) {
      await this.app.bean.role.setDirty(true);
    }
  }
}
