import { LocalCache } from '../index.js';
import { Bean, BeanModuleScopeBase } from '@cabloy/core';
import { ScopeModule } from '../resource/this.js';

let __cacheBases;

@Bean()
export class BeanSummer extends BeanModuleScopeBase<ScopeModule> {
  get confieModule() {
    return this.scope.config;
  }

  getCache({ module, name, fullKey }: any) {
    const { key } = this._prepareFullKey({ module, name, fullKey });
    const cacheBase = this._findCacheBase({ fullKey: key });
    if (!cacheBase) throw new Error(`summer cache not found: ${key}`);
    return this.ctx.bean._newBean(LocalCache, {
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
    const cacheBase = this._findCacheBaseInner({ fullKey: key });
    if (cacheBase) return cacheBase;
    // dynamic
    const configGroup = this.confieModule.summer.group[group];
    const dynamic = configGroup.dynamic;
    if (!dynamic) return;
    const configDefault = this.confieModule.summer.config.group[group][configGroup.configDefault];
    return configDefault;
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
      const config = this.ctx.app.meta.configs[moduleName];
      const summerGroups = this.ctx.bean.util.getProperty(config, 'summer.group');
      if (!summerGroups) continue;
      for (const groupName in summerGroups) {
        const summerGroup = summerGroups[groupName];
        for (const key in summerGroup) {
          let cache = summerGroup[key];
          // config
          if (cache.config) {
            const configDefault = this.confieModule.summer.config.group[groupName][cache.config];
            cache = this.ctx.bean.util.extend({}, configDefault, cache);
          }
          // fullKey
          const fullKey = groupName === 'default' ? `${moduleName}:${key}` : `${moduleName}:${groupName}:${key}`;
          // bean
          let beanFullName;
          const beanName = cache.bean;
          if (beanName) {
            if (typeof beanName === 'string') {
              beanFullName = `${moduleName}.summer.cache.${beanName}`;
            } else {
              beanFullName = `${beanName.module || moduleName}.summer.cache.${beanName.name}`;
            }
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
