import { Cast, isNil } from 'vona';
import async from 'async';
import chalk from 'chalk';
import boxen from 'boxen';
import { Bean, BeanBase } from 'vona';
import { ScopeModule, __ThisModule__ } from '../.metadata/this.js';
import { IModelSelectParams } from 'vona-module-a-database';
import { EntityInstance } from '../entity/instance.js';

const boxenOptions: boxen.Options = {
  padding: 1,
  margin: 1,
  align: 'center',
  borderColor: 'yellow',
  borderStyle: 'round',
} as boxen.Options;

const __queueInstanceStartup: any = {};
const __cacheIntancesConfig: Record<string, object> = {};

@Bean()
export class BeanInstance extends BeanBase<ScopeModule> {
  get cacheMem() {
    return this.scope._bean.cacheMem;
  }
  get modelInstance() {
    return this.scope.model.instance;
  }

  async list(options) {
    // options
    if (!options) options = { where: null, orders: null, page: null };
    const page = this.ctx.bean.util.page(options.page, false);
    const orders = options.orders;
    const where = options.where; // allow disabled=undefined
    // const where = options.where || { disabled: 0 }; // allow disabled=undefined
    // select
    const _options = { where, orders } as IModelSelectParams;
    if (page.size !== 0) {
      _options.limit = page.size;
      _options.offset = page.index;
    }
    return await this.modelInstance.select(_options);
  }

  async get(subdomain: string) {
    if (isNil(subdomain)) this.ctx.throw(403);
    return await this._get(subdomain);
  }

  async _get(subdomain: string): Promise<EntityInstance | null> {
    // get
    const instance = await this.modelInstance.get({ name: subdomain });
    if (instance) return instance;
    // instance base
    const instanceBase = this._getInstanceBase({ subdomain });
    if (!instanceBase) return null;
    // lock
    return await this.ctx.meta.util.lock({
      subdomain: null,
      resource: `${__ThisModule__}.registerInstance.${subdomain}`,
      fn: async () => {
        return await this.ctx.meta.util.executeBeanIsolate({
          subdomain: null,
          beanFullName: 'instance',
          context: { instanceBase },
          fn: '_registerLock',
        });
      },
    });
  }

  async _registerLock({ instanceBase }: any) {
    // get again
    let instance = await this.modelInstance.get({ name: instanceBase.subdomain });
    if (instance) return instance;
    // insert
    instance = {
      name: instanceBase.subdomain,
      title: instanceBase.title,
      config: JSON.stringify(instanceBase.config || {}),
      disabled: 0,
    } as EntityInstance;
    const res = await this.modelInstance.insert(instance);
    instance.id = res[0] as number;
    return instance;
  }

  _getInstanceBase({ subdomain }: any) {
    const instances = this.ctx.app.config.instances || [{ subdomain: '', password: '' }];
    return instances.find(item => item.subdomain === subdomain);
  }

  async reload() {
    // broadcast
    this.ctx.meta.util.broadcastEmit({
      module: 'a-instance',
      broadcastName: 'reload',
      data: null,
    });
  }

  async instanceChanged(reload = true) {
    if (reload) {
      // force to reload instance
      await this.reload();
    } else {
      // broadcast
      this.ctx.meta.util.broadcastEmit({
        module: 'a-instance',
        broadcastName: 'resetCache',
        data: null,
      });
    }
  }

  async checkAppReady(options?: { wait?: boolean }) {
    if (!options) options = { wait: true };
    if (!this.ctx.app.meta.appReady && options.wait === false) return false;
    while (!this.ctx.app.meta.appReady) {
      await this.ctx.bean.util.sleep(300);
    }
    return true;
  }

  async checkAppReadyInstance(options?: { startup: boolean }) {
    if (!options) options = { startup: true };
    // chech appReady first
    const appReady = await this.checkAppReady({ wait: options.startup !== false });
    if (!appReady) return false;
    // check appReady instance
    const subdomain = this.ctx.subdomain;
    if (subdomain === undefined) throw new Error(`subdomain not valid: ${subdomain}`);
    if (this.ctx.app.meta.appReadyInstances[subdomain]) return true;
    // instance startup
    if (options.startup === false) return false;
    await this.instanceStartup({ subdomain });
    return true;
  }

  async resetCache(subdomain: string) {
    await this._cacheInstanceConfig(subdomain, true);
  }

  async _cacheInstanceConfig(subdomain: string, force: boolean) {
    if (__cacheIntancesConfig[subdomain] && !force) return;
    const instance = await this.get(subdomain);
    if (!instance) this.ctx.throw(403);
    // config
    instance.config = JSON.parse(instance.config);
    // cache configs
    __cacheIntancesConfig[subdomain] = this.$appUtil.extend({}, this.ctx.app.config, instance.config);
  }

  // options: force/instanceBase
  async instanceStartup({ subdomain, options }: { subdomain: string; options?: object }) {
    // cache instance config
    await this._cacheInstanceConfig(subdomain, false);
    // queue within the same worker
    if (!__queueInstanceStartup[subdomain]) {
      __queueInstanceStartup[subdomain] = async.queue((info, cb) => {
        // check again
        const force = info.options && info.options.force;
        if (this.ctx.app.meta.appReadyInstances[info.subdomain] && !force) {
          info.resolve();
          cb();
          return;
        }
        // startup
        Cast(this.ctx.app.meta)
          ._runStartupInstance({ subdomain: info.subdomain, options: info.options })
          .then(() => {
            info.resolve();
            cb();
          })
          .catch(err => {
            info.reject(err);
            cb();
          });
      });
    }
    // promise
    return new Promise((resolve, reject) => {
      // options
      if (!options) options = { force: false, instanceBase: null };
      // queue push
      __queueInstanceStartup[subdomain].push({ resolve, reject, subdomain, options });
    });
  }

  async initInstance() {
    // instance
    const instance = await this.get(this.ctx.subdomain);
    if (!instance) {
      // prompt: should for local/prod
      // if (this.ctx.app.meta.isLocal) {
      const urlInfo =
        this.ctx.locale === 'zh-cn'
          ? 'https://cabloy.com/zh-cn/articles/multi-instance.html'
          : 'https://cabloy.com/articles/multi-instance.html';
      let message = `Please add instance in ${chalk.keyword('cyan')('src/backend/config/config.[env].js')}`;
      message += '\n' + chalk.keyword('orange')(`{ subdomain: '${this.ctx.subdomain}', password: '', title: '' }`);
      message += `\nMore info: ${chalk.keyword('cyan')(urlInfo)}`;
      console.log('\n' + boxen(message, boxenOptions));
      // }
      return this.ctx.throw(423); // not this.ctx.fail(423)
    }
    // check if disabled
    if (instance.disabled) {
      // locked
      console.log('instance disabled: ', this.ctx.subdomain);
      return this.ctx.throw(423); // not this.ctx.fail(423)
    }

    // check instance startup ready
    await this.checkAppReadyInstance();

    // try to save host/protocol to config
    if (ctxHostValid(this.ctx)) {
      if (!instance.config['a-base']) instance.config['a-base'] = {};
      const aBase = instance.config['a-base'];
      if (aBase.host !== this.ctx.host || aBase.protocol !== this.ctx.protocol) {
        aBase.host = this.ctx.host;
        aBase.protocol = this.ctx.protocol;
        // update
        await this.modelInstance.update({
          id: instance.id,
          config: JSON.stringify(instance.config),
        });
        // changed
        await this.instanceChanged(false);
      }
    }

    // ok
    this.ctx.instance = instance;
  }
}

function ctxHostValid(ctx) {
  // not check localhost, because almost inner api call use 127.0.0.1
  return (
    !ctx.innerAccess &&
    ctx.host &&
    ctx.protocol &&
    ctx.host.indexOf('127.0.0.1') === -1 &&
    // ctx.host.indexOf('localhost') === -1 &&
    ['http', 'https'].includes(ctx.protocol)
  );
}
