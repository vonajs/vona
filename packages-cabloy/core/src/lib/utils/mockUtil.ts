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

  async mockCtx(options?: { locale?: string; subdomain?: string | null; module?: string }) {
    options = options || {};
    const locale = options.locale;
    const subdomain = options.subdomain !== undefined ? options.subdomain : '';
    const module = options.module;
    const ctx = await this.app.meta.util.createAnonymousContext({ locale, subdomain, module } as any);
    return ctx;
  }
}

function _prepareApiPrefix(apiPrefix) {
  if (typeof apiPrefix === 'string') return apiPrefix;
  return apiPrefix ? '/api' : '';
}
