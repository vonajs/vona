import { ScopeModule, __ThisModule__ } from '../resource/this.js';
import { Bean, BeanBase, CabloyContext } from '@cabloy/core';
import { BeanAuthProviderBase } from './virtual.authProviderBase.js';

@Bean()
export class BeanAuthProvider extends BeanBase<ScopeModule> {
  get modelAuthProvider() {
    return this.scope.model.authProvider;
  }
  get localPassport() {
    return this.scope.local.passport;
  }

  getAuthProviderBase({ module, providerName }: any) {
    const providerFullName = `${module}:${providerName}`;
    const authProviders = this.ctx.bean.base.authProviders();
    return authProviders[providerFullName];
  }

  async getAuthProvider({ id, module, providerName }: any) {
    // this.ctx.instance maybe not exists
    const data = id ? { id } : { module, providerName };
    const res = await this.modelAuthProvider.get(data);
    if (res) return res;
    if (!module || !providerName) throw new Error('Invalid arguments');
    // lock
    return await this.ctx.meta.util.lock({
      resource: `${__ThisModule__}.authProvider.register`,
      fn: async () => {
        return await this.ctx.meta.util.executeBeanIsolate({
          beanModule: __ThisModule__,
          beanFullName: 'authProvider',
          context: { module, providerName },
          fn: '_registerAuthProviderLock',
        });
      },
    });
  }

  createAuthProviderBean({ module, providerName, providerScene }: any): BeanAuthProviderBase {
    const providerFullName = `${module}:${providerName}`;
    const authProvider = this.getAuthProviderBase({ module, providerName });
    const beanName = authProvider.meta.bean;
    if (!beanName) throw new Error(`auth provider bean not specified: ${providerFullName}`);
    return this.ctx.bean._newBean(`${beanName.module}.auth.provider.${beanName.name}`, {
      authProvider,
      providerModule: module,
      providerName,
      providerScene: authProvider.meta.scene ? providerScene : null,
    });
  }

  async authenticateDirect({ module, providerName, providerScene, query, body }: any) {
    return await this.ctx.meta.util.executeBeanIsolate({
      beanModule: __ThisModule__,
      beanFullName: `${__ThisModule__}.local.passport`,
      context: { module, providerName, providerScene },
      fn: 'authenticate',
      ctxParent: {
        session: this.ctx.session,
        cookies: this.ctx.cookies,
        user: this.ctx.user,
        state: this.ctx.state,
        request: { headers: this.ctx.headers, query, body },
      },
    });
  }

  _combineAuthenticateUrls({ module, providerName, providerScene }: any) {
    const authProvider = this.getAuthProviderBase({ module, providerName });
    const urlParamScene = authProvider.meta.scene ? `/${providerScene}` : '';
    return {
      loginURL: `/api/a/auth/passport/${module}/${providerName}${urlParamScene}`,
      callbackURL: `/api/a/auth/passport/${module}/${providerName}${urlParamScene}/callback`,
    };
  }

  async _registerAuthProviderLock({ module, providerName }: any) {
    // get
    const res = await this.modelAuthProvider.get({ module, providerName });
    if (res) return res;
    // data
    // const _authProviders = this.ctx.bean.base.authProviders();
    // const _provider = _authProviders[`${module}:${providerName}`];
    // if (!_provider) throw new Error(`authProvider ${module}:${providerName} not found!`);
    const data: any = {
      module,
      providerName,
      // config: JSON.stringify(_provider.config),
      disabled: 0,
    };
    // insert
    const res2 = await this.modelAuthProvider.insert(data);
    data.id = res2.insertId;
    return data;
  }

  _registerRouters() {
    // url pattern
    const urlPattern = /\/api\/a\/auth\/passport\/(.+)$/;
    // authenticate
    const authenticate = _createAuthenticate();
    // middlewares
    const middlewaresPost: any[] = [];
    const middlewaresGet: any[] = [];
    if (!this.ctx.app.meta.isTest) middlewaresPost.push('inner');
    middlewaresPost.push(authenticate);
    middlewaresGet.push(authenticate);
    // mount routes
    const routes = [
      {
        name: 'get:api-a-auth-passport',
        method: 'get',
        path: urlPattern,
        middlewares: middlewaresGet,
        meta: { auth: { enable: false } },
      },
      {
        name: 'post:api-a-auth-passport',
        method: 'post',
        path: urlPattern,
        middlewares: middlewaresPost,
        meta: { auth: { enable: false } },
      },
    ];
    for (const route of routes) {
      this.ctx.app.meta.router.unRegister(route.name);
      this.ctx.app.meta.router.register(__ThisModule__, route);
    }
  }
}

function _createAuthenticate() {
  return async function (ctx: CabloyContext, next) {
    const urlPattern = ctx.params[0];
    const [module, providerName, providerScene] = urlPattern.split('/');
    ctx.params.module = module;
    ctx.params.providerName = providerName;
    ctx.params.providerScene = providerScene;
    // authenticate
    await ctx.bean.scope(__ThisModule__).local.passport.authenticate({
      module,
      providerName,
      providerScene,
      next,
    });
  };
}
