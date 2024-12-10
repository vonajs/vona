import { VonaContext } from '../../types/context/index.js';
import { cast } from '../../types/utils/cast.js';
import { BeanSimple } from '../bean/beanSimple.js';
import { ILocalInfos } from '../bean/resource/locale/type.js';

export class AppMockUtil extends BeanSimple {
  parseUrlFromModuleInfo(moduleInfo, apiPrefix: string | boolean = true) {
    apiPrefix = _prepareApiPrefix(apiPrefix);
    if (!moduleInfo) return null;
    return `${apiPrefix}/${moduleInfo.pid}/${moduleInfo.name}`;
  }

  mockUrl(moduleInfo, url, apiPrefix: string | boolean = true) {
    apiPrefix = _prepareApiPrefix(apiPrefix);
    if (url && url.charAt(0) === '/') return `${apiPrefix}${url}`;
    const prefix = this.parseUrlFromModuleInfo(moduleInfo, apiPrefix);
    return url ? `${prefix}/${url}` : `${prefix}/`;
  }

  // todo: remove module
  async mockCtx<T>(scope: (ctx: VonaContext) => Promise<T>): Promise<T>;
  async mockCtx<T>(
    options: { locale?: keyof ILocalInfos; subdomain?: string | null | undefined; module?: string },
    scope: (ctx: VonaContext) => Promise<T>,
  ): Promise<T>;
  async mockCtx<T>(
    options:
      | ((ctx: VonaContext) => Promise<T>)
      | { locale?: keyof ILocalInfos; subdomain?: string | null | undefined; module?: string },
    scope?: (ctx: VonaContext) => Promise<T>,
  ): Promise<T> {
    if (typeof options === 'function') {
      scope = options;
      options = {};
    }
    const locale = options.locale;
    const subdomain = options.subdomain !== undefined ? options.subdomain : '';
    const module = options.module;
    const beanExecutor = cast(this.app.bean._getBean('executor' as any));
    return await beanExecutor.runInAnonymousContextScope(scope!, { locale, subdomain, module });
  }
}

function _prepareApiPrefix(apiPrefix) {
  if (typeof apiPrefix === 'string') return apiPrefix;
  return apiPrefix ? '/api' : '';
}
