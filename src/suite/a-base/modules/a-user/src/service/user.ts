import { BeanBase } from 'vona';
import { Service } from 'vona-module-a-web';

const __appKeyDefault = 'a-app:appDefault';

@Service()
export class ServiceUser extends BeanBase {
  async save({ data, user }: any) {
    // id
    data.id = user.id;
    // readOnly
    delete data.userName;
    delete data.email;
    delete data.mobile;
    delete data.locale;
    // save
    return await this.app.bean.user.save({ user: data });
  }

  async saveAvatar({ data, user }: any) {
    const userData = { id: user.id, avatar: data.avatar };
    return await this.app.bean.user.save({ user: userData });
  }

  async saveLocale({ data, user }: any) {
    const userData = { id: user.id, locale: data.locale };
    return await this.app.bean.user.save({ user: userData });
  }

  async changeUserName({ data, user }: any) {
    const userData = { id: user.id, userName: data.userName };
    return await this.app.bean.user.changeUserName({ user: userData });
  }

  async agent({ userId }: any) {
    return await this.app.bean.user.agent({ userId });
  }

  async agentsBy({ userId }: any) {
    return await this.app.bean.user.agentsBy({ userId });
  }

  async userByMobile({ mobile }: any) {
    return await this.app.bean.user.exists({ mobile });
  }

  async addAgent({ userIdAgent, userId }: any) {
    return await this.app.bean.user.addAgent({ userIdAgent, userId });
  }

  async removeAgent({ userIdAgent, userId }: any) {
    return await this.app.bean.user.removeAgent({ userIdAgent, userId });
  }

  async switchAgent({ userIdAgent }: any) {
    return await this.app.bean.user.switchAgent({ userIdAgent });
  }

  async switchOffAgent() {
    return await this.app.bean.user.switchOffAgent();
  }

  async authentications({ user }: any) {
    // 1. get auth providers list from a-login
    let listLogin = this.app.bean.util.extend([], this.app.bean.authProviderCache.getAuthProvidersConfigForLogin());
    if (listLogin.length === 0) return [];
    // 2. list aAuth
    const list = await this.bean.model.select('aAuth as a', {
      columns: ['a.id', 'a.providerId', 'a.providerScene', 'b.module', 'b.providerName'],
      joins: [['innerJoin', 'aAuthProvider as b', { 'a.providerId': 'b.id' }]],
      where: {
        'a.userId': user.id,
      },
    });
    // 3. map
    for (const auth of list) {
      const authId = auth.id;
      const provider = listLogin.find(item => item.module === auth.module && item.providerName === auth.providerName);
      // maybe disabled
      if (!provider) continue;
      // meta
      if (!provider.meta.scene) {
        provider.scenes.default.__authId = authId;
      } else {
        const scene = provider.scenes[auth.providerScene];
        // // maybe disabled
        if (!scene) continue;
        scene.__authId = authId;
      }
    }
    // 4. filter inner || disableAssociate:true and no __authId
    listLogin = listLogin.filter(item => {
      for (const sceneName of Object.keys(item.scenes)) {
        const scene = item.scenes[sceneName];
        const metaScene = this._getMetaScene(item, sceneName);
        if (metaScene.inner || (metaScene.disableAssociate && !scene.__authId)) {
          delete item.scenes[sceneName];
        }
      }
      return Object.keys(item.scenes).length > 0;
    });
    // ok
    return listLogin;
  }

  _getMetaScene(item, sceneName) {
    const meta = item.meta;
    if (meta.scene) {
      const scene = item.metaScenes && item.metaScenes[sceneName];
      return (scene && scene.meta) || meta;
    }
    return meta;
  }

  async authenticationDisable({ authId, user }: any) {
    // must use userId in where
    await this.bean.auth.model.delete({
      id: authId,
      userId: user.id,
    });
  }

  async themeLoad({ appKey, user }: any) {
    const key = this._getThemeKey({ appKey, user });
    return await this.scope.status.get(key);
  }

  async themeSave({ appKey, theme, user }: any) {
    const key = this._getThemeKey({ appKey, user });
    await this.scope.status.set(key, theme);
  }

  _getThemeKey({ appKey, user }: any) {
    return `user-theme:${user.id}:${appKey || __appKeyDefault}`;
  }
}
