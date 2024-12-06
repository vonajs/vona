import { Bean, BeanModuleScopeBase } from 'vona';
import { ScopeModule } from '../.metadata/this.js';
import { BeanSummerCacheBase } from './bean.summerCacheBase_.js';

let __cacheBases;

@Bean()
export class BeanSummer extends BeanModuleScopeBase<ScopeModule> {
  get configModule() {
    return this.scope.config;
  }

  getCache({ module, name, fullKey }: any) {
    const { key } = this._prepareFullKey({ module, name, fullKey });
    const cacheBase = this._findCacheBase({ fullKey: key });
    if (!cacheBase) throw new Error(`summer cache not found: ${key}`);
    return this.app.bean._newBean(BeanSummerCacheBase, {
      cacheBase,
    });
  }

  async get(cacheName, key, options?) {
    const cache = this.getCache(cacheName);
    return await cache.get(key, options);
  }

  async mget(cacheName, keys, options?) {
    const cache = this.getCache(cacheName);
    return await cache.mget(keys, options);
  }

  async del(cacheName, key, options?) {
    const cache = this.getCache(cacheName);
    return await cache.del(key, options);
  }

  async mdel(cacheName, keys, options?) {
    const cache = this.getCache(cacheName);
    return await cache.mdel(keys, options);
  }

  async clear(cacheName, options?) {
    const cache = this.getCache(cacheName);
    return await cache.clear(options);
  }

  async peek(cacheName, key, options?) {
    const cache = this.getCache(cacheName);
    return await cache.peek(key, options);
  }

  _findCacheBaseInner({ module, name, fullKey }: any) {
    const { key } = this._prepareFullKey({ module, name, fullKey });
    if (!__cacheBases) {
      __cacheBases = this._collectCacheBases();
    }
    return __cacheBases[key];
  }

  _findCacheBase({ module, name, fullKey }: any) {
    const { key, group } = this._prepareFullKey({ module, name, fullKey });
    let cacheBase = this._findCacheBaseInner({ fullKey: key });
    if (cacheBase) return cacheBase;
    // dynamic
    const configGroup = this.configModule.summer.group[group];
    const dynamic = configGroup.dynamic;
    if (!dynamic) return;
    // default
    const configDefault = this.configModule.summer.config.group[group][configGroup.configDefault];
    cacheBase = { ...configDefault, fullKey: key };
    // hold
    __cacheBases[key] = cacheBase;
    // ok
    return cacheBase;
  }

  _prepareFullKey({ module, name, fullKey }: any) {
    // key
    let key;
    if (!fullKey) {
      key = `${module || this.moduleScope}:${name}`;
    } else {
      key = fullKey;
    }
    // group
    const parts = key.split(':');
    const group = parts.length === 2 ? 'default' : parts[1];
    // ok
    return { key, group };
  }

  _collectCacheBases() {
    const cacheBases: any = {};
    for (const module of this.ctx.app.meta.modulesArray) {
      const moduleName = module.info.relativeName;
      // ignore a-summer
      if (moduleName === 'a-summer') continue;
      const config = this.ctx.app.config.modules[moduleName];
      const summerGroups = this.app.bean.util.getProperty(config, 'summer.group');
      if (!summerGroups) continue;
      for (const groupName in summerGroups) {
        const summerGroup = summerGroups[groupName];
        for (const key in summerGroup) {
          let cache = summerGroup[key];
          // config
          if (cache.config) {
            const configDefault = this.configModule.summer.config.group[groupName][cache.config];
            cache = this.app.bean.util.extend({}, configDefault, cache);
          }
          // fullKey
          const fullKey = groupName === 'default' ? `${moduleName}:${key}` : `${moduleName}:${groupName}:${key}`;
          // bean
          let beanFullName;
          if (cache.bean) {
            beanFullName = this.bean.util.combineBeanFullName({
              module: moduleName,
              scene: 'summer.cache',
              bean: cache.bean,
            });
          }
          // ok
          cacheBases[fullKey] = {
            ...cache,
            key,
            fullKey,
            beanFullName,
          };
        }
      }
    }
    return cacheBases;
  }
}
