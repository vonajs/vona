const ModuleInfo = require('@cabloy/module-info');

export default app => {
  return {
    parseUrlFromPackage(dir, apiPrefix = true) {
      apiPrefix = _prepareApiPrefix(apiPrefix);
      const moduleInfo = this.parseInfoFromPackage(dir);
      if (!moduleInfo) return null;
      return `${apiPrefix}/${moduleInfo.pid}/${moduleInfo.name}`;
    },
    parseInfoFromPackage(dir) {
      return ModuleInfo.parseInfoFromPackage(dir);
    },
    mockUrl(dir, url, apiPrefix = true) {
      apiPrefix = _prepareApiPrefix(apiPrefix);
      if (url && url.charAt(0) === '/') return `${apiPrefix}${url}`;
      const prefix = this.parseUrlFromPackage(dir, apiPrefix);
      return url ? `${prefix}/${url}` : `${prefix}/`;
    },
    async mockCtx(options) {
      options = options || {};
      const locale = options.locale;
      const subdomain = options.subdomain !== undefined ? options.subdomain : '';
      const ctx = await app.meta.util.createAnonymousContext({ locale, subdomain });
      return ctx;
    },
  };
};

function _prepareApiPrefix(apiPrefix) {
  if (typeof apiPrefix === 'string') return apiPrefix;
  return apiPrefix ? '/api' : '';
}
