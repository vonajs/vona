import { VonaContext } from '../../types/context/index.js';
import { BeanSimple } from '../bean/beanSimple.js';

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
  async mockRunInAnonymousContextScope<T>(
    scope: (ctx: VonaContext) => Promise<T>,
    options?: { locale?: string; subdomain?: string | null | undefined; module?: string },
  ): Promise<T> {
    options = options || {};
    const locale = options.locale;
    const subdomain = options.subdomain !== undefined ? options.subdomain : '';
    const module = options.module;
    return await this.app.meta.util.runInAnonymousContextScope(scope, { locale, subdomain, module });
  }
}

function _prepareApiPrefix(apiPrefix) {
  if (typeof apiPrefix === 'string') return apiPrefix;
  return apiPrefix ? '/api' : '';
}
