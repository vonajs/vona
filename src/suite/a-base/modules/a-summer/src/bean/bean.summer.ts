import { LocalCache } from '../index.js';
import { Bean, BeanModuleScopeBase } from '@cabloy/core';

let __cacheBases;

@Bean()
export class BeanSummer extends BeanModuleScopeBase {
  getCache({ module, name, fullKey }: any) {
    fullKey = this._prepareFullKey({ module, name, fullKey });
    const cacheBase = this._findCacheBase({ fullKey });
    if (!cacheBase) throw new Error(`summer cache not found: ${fullKey}`);
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

  _findCacheBase({ module, name, fullKey }: any) {
    fullKey = this._prepareFullKey({ module, name, fullKey });
    if (!__cacheBases) {
      __cacheBases = this._collectCacheBases();
    }
    return __cacheBases[fullKey];
  }

  _prepareFullKey({ module, name, fullKey }: any) {
    if (!fullKey) {
      module = module || this.moduleScope;
      fullKey = `${module}:${name}`;
    }
    return fullKey;
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
          const cache = summerGroup[key];
          const fullKey = `${moduleName}:${groupName}:${key}`;
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
