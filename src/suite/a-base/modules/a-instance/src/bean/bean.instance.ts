import { Cast, ConfigInstanceBase, deepExtend, isNil, VonaConfig } from 'vona';
import async from 'async';
import chalk from 'chalk';
import boxen from 'boxen';
import { Bean, BeanBase } from 'vona';
import { ScopeModule, __ThisModule__ } from '../.metadata/this.js';
import { IModelSelectParams } from 'vona-module-a-database';
import { EntityInstance, IInstanceStartupOptions, IInstanceStartupQueueInfo } from '../entity/instance.js';

const boxenOptions: boxen.Options = {
  padding: 1,
  margin: 1,
  align: 'center',
  borderColor: 'yellow',
  borderStyle: 'round',
} as boxen.Options;

const __queueInstanceStartup: any = {};
const __cacheIntancesConfig: Record<string, VonaConfig> = {};

@Bean()
export class BeanInstance extends BeanBase<ScopeModule> {
  get modelInstance() {
    return this.scope.model.instance;
  }

  get config(): VonaConfig {
    return this.getConfig()!;
  }

  getConfig(subdomain?: string): VonaConfig | undefined {
    if (isNil(subdomain) && this.ctx?.instance) {
      subdomain = this.ctx?.subdomain;
    }
    if (isNil(subdomain)) return undefined;
    return __cacheIntancesConfig[subdomain];
  }

  async list(options?) {
    // options
    if (!options) options = { where: null, orders: null, page: null };
    const page = this.app.bean.util.page(options.page, false);
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
    if (isNil(subdomain)) this.app.throw(403);
    return await this._get(subdomain);
  }

  async _get(subdomain: string): Promise<EntityInstance | null> {
    // get
    const instance = await this.modelInstance.get({ name: subdomain });
    if (instance) return instance;
    // instance base
    const configInstanceBase = this._getConfigInstanceBase(subdomain);
    if (!configInstanceBase) return null;
    // lock
    return await this.ctx.meta.util.lock({
      subdomain: null,
      resource: `${__ThisModule__}.registerInstance.${subdomain}`,
      fn: async () => {
        return await this.ctx.meta.util.executeBeanIsolate({
          subdomain: null,
          beanFullName: 'instance',
          context: { configInstanceBase },
          fn: '_registerLock',
        });
      },
    });
  }

  async _registerLock({ configInstanceBase }: { configInstanceBase: ConfigInstanceBase }) {
    // get again
    let instance = await this.modelInstance.get({ name: configInstanceBase.subdomain });
    if (instance) return instance;
    // insert
    instance = {
      name: configInstanceBase.subdomain,
      title: configInstanceBase.title,
      config: JSON.stringify(configInstanceBase.config || {}),
      disabled: 0,
    } as EntityInstance;
    const res = await this.modelInstance.insert(instance);
    instance.id = res[0] as number;
    return instance;
  }

  _getConfigInstanceBase(subdomain: string) {
    const instances = this.app.config.instances || [{ subdomain: '', password: '' }];
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

  async instanceChanged(reload: boolean = true) {
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
      await this.app.bean.util.sleep(300);
    }
    return true;
  }

  async checkAppReadyInstance(startup: boolean) {
    // chech appReady first
    const appReady = await this.checkAppReady({ wait: startup !== false });
    if (!appReady) return false;
    // check appReady instance
    const subdomain = this.ctx.subdomain;
    if (subdomain === undefined) throw new Error(`subdomain not valid: ${subdomain}`);
    if (this.ctx.app.meta.appReadyInstances[subdomain]) return true;
    // instance startup
    if (startup === false) return false;
    await this.instanceStartup(subdomain);
    return true;
  }

  async resetCache(subdomain: string) {
    await this._cacheInstanceConfig(subdomain, true);
  }

  async _cacheInstanceConfig(subdomain: string, force: boolean) {
    if (__cacheIntancesConfig[subdomain] && !force) return;
    let instance = await this.get(subdomain);
    if (!instance) this.app.throw(403);
    instance = instance!;
    // config
    const instanceConfig = JSON.parse(instance.config);
    // cache configs
    __cacheIntancesConfig[subdomain] = deepExtend({}, this.ctx.app.config, instanceConfig, {
      instances: undefined,
    });
  }

  // options: force/instanceBase
  async instanceStartup(subdomain: string, options?: IInstanceStartupOptions) {
    // cache instance config
    await this._cacheInstanceConfig(subdomain, false);
    // queue within the same worker
    if (!__queueInstanceStartup[subdomain]) {
      __queueInstanceStartup[subdomain] = async.queue((info: IInstanceStartupQueueInfo, cb: Function) => {
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
      if (!options) options = { force: false, configInstanceBase: undefined };
      // queue push
      const info: IInstanceStartupQueueInfo = { resolve, reject, subdomain, options };
      __queueInstanceStartup[subdomain].push(info);
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
      return this.app.throw(423); // not this.app.fail(423)
    }
    // check if disabled
    if (instance.disabled) {
      // locked
      console.log('instance disabled: ', this.ctx.subdomain);
      return this.app.throw(423); // not this.app.fail(423)
    }

    // check instance startup ready
    await this.checkAppReadyInstance(true);

    // ok
    this.ctx.instance = instance;
  }
}
