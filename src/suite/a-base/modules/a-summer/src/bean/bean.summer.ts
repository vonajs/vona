import { Bean, BeanModuleScopeBase, IDecoratorSummerCacheOptions } from 'vona';
import { ScopeModule } from '../.metadata/this.js';
import { BeanSummerCacheBase } from './bean.summerCacheBase_.js';

@Bean()
export class BeanSummer extends BeanModuleScopeBase<ScopeModule> {
  cache(cacheName: string, cacheOptions?: IDecoratorSummerCacheOptions): BeanSummerCacheBase {
    if (cacheName.includes('.summerCache.')) {
      return this.app.bean._getBeanSelector(cacheName as any, undefined, cacheOptions);
    }
    return this.app.bean._getBeanSelector(BeanSummerCacheBase, cacheName, cacheOptions);
  }

  // _findCacheBase({ module, name, fullKey }: any) {
  //   const { key, group } = this._prepareFullKey({ module, name, fullKey });
  //   let cacheBase = this._findCacheBaseInner({ fullKey: key });
  //   if (cacheBase) return cacheBase;
  //   // dynamic
  //   const configGroup = this.configModule.summer.group[group];
  //   const dynamic = configGroup.dynamic;
  //   if (!dynamic) return;
  //   // default
  //   const configDefault = this.configModule.summer.config.group[group][configGroup.configDefault];
  //   cacheBase = { ...configDefault, fullKey: key };
  //   // hold
  //   __cacheBases[key] = cacheBase;
  //   // ok
  //   return cacheBase;
  // }

  // _collectCacheBases() {
  //   const cacheBases: any = {};
  //   for (const module of this.ctx.app.meta.modulesArray) {
  //     const moduleName = module.info.relativeName;
  //     // ignore a-summer
  //     const config = this.ctx.app.config.modules[moduleName];
  //     const summerGroups = this.app.bean.util.getProperty(config, 'summer.group');
  //     if (!summerGroups) continue;
  //     for (const groupName in summerGroups) {
  //       const summerGroup = summerGroups[groupName];
  //       for (const key in summerGroup) {
  //         let cache = summerGroup[key];
  //         // config
  //         if (cache.config) {
  //           const configDefault = this.configModule.summer.config.group[groupName][cache.config];
  //           cache = this.app.bean.util.extend({}, configDefault, cache);
  //         }
  //         // fullKey
  //         const fullKey = groupName === 'default' ? `${moduleName}:${key}` : `${moduleName}:${groupName}:${key}`;
  //         // bean
  //         let beanFullName;
  //         if (cache.bean) {
  //           beanFullName = this.bean.util.combineBeanFullName({
  //             module: moduleName,
  //             scene: 'summer.cache',
  //             bean: cache.bean,
  //           });
  //         }
  //         // ok
  //         cacheBases[fullKey] = {
  //           ...cache,
  //           key,
  //           fullKey,
  //           beanFullName,
  //         };
  //       }
  //     }
  //   }
  //   return cacheBases;
  // }
}
