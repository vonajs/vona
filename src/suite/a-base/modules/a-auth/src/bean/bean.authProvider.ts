import { Bean } from 'vona-module-a-bean';
import { __ThisModule__ } from '../.metadata/this.js';
import { BeanBase, VonaContext } from 'vona';
import { BeanAuthProviderBase } from './bean.authProviderBase_.js';

@Bean()
export class BeanAuthProvider extends BeanBase {
  get modelAuthProvider() {
    return this.scope.model.authProvider;
  }
  get localPassport() {
    return this.scope.service.passport;
  }

  getAuthProviderBase({ module, providerName }: any) {
    const providerFullName = `${module}:${providerName}`;
    const authProviders = this.app.bean.base.authProviders();
    return authProviders[providerFullName];
  }

  async getAuthProvider({ id, module, providerName }: any) {
    // this.ctx.instance maybe not exists
    const data = id ? { id } : { module, providerName };
    const res = await this.modelAuthProvider.get(data);
    if (res) return res;
    if (!module || !providerName) throw new Error('Invalid arguments');
    // lock
    return await this.scope.redlock.lockIsolate('authProvider.register', async () => {
      return await this._registerAuthProviderLock({ module, providerName });
    });
  }

  createAuthProviderBean({ module, providerName, providerScene }: any): BeanAuthProviderBase {
    const providerFullName = `${module}:${providerName}`;
    const authProvider = this.getAuthProviderBase({ module, providerName });
    const beanName = authProvider.meta.bean;
    if (!beanName) throw new Error(`auth provider bean not specified: ${providerFullName}`);
    return this.app.bean._newBean(`${beanName.module}.auth.provider.${beanName.name}` as any, {
      authProvider,
      providerModule: module,
      providerName,
      providerScene: authProvider.meta.scene ? providerScene : null,
    });
  }

  async authenticateDirect({ module, providerName, providerScene, query: _query, body: _body }: any) {
    // todo: authenticate内部使用了app.passport.authenticate，可能需要调整
    //    直接参考passport原始文档，重新实现
    return await this.bean.executor.newCtxIsolate(
      async () => {
        return await this.scope.service.passport.authenticate({ module, providerName, providerScene });
      },
      {
        extraData: {
          // todo: 可能需要重新调整参数
          //session: this.ctx.session,
          //cookies: this.ctx.cookies,
          //user: this.ctx.user,
          state: this.ctx.state,
          //request: { headers: this.ctx.headers, query, body },
        },
      },
    );
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
    // const _authProviders = this.app.bean.base.authProviders();
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
    data.id = res2[0];
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
    ] as const;
    for (const route of routes) {
      this.bean.router.unRegister(route.name);
      this.bean.router.register(__ThisModule__, route);
    }
  }
}

function _createAuthenticate() {
  return async function (ctx: VonaContext, next) {
    const urlPattern = ctx.params[0];
    const [module, providerName, providerScene] = urlPattern.split('/');
    ctx.params.module = module;
    ctx.params.providerName = providerName;
    ctx.params.providerScene = providerScene;
    // authenticate
    await ctx.app.bean.scope(__ThisModule__).service.passport.authenticate({
      module,
      providerName,
      providerScene,
      next,
    });
  };
}
