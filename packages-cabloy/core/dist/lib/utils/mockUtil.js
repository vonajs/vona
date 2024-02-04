"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppMockUtil = void 0;
const beanSimple_js_1 = require("../bean/beanSimple.js");
class AppMockUtil extends beanSimple_js_1.BeanSimple {
    parseUrlFromModuleInfo(moduleInfo, apiPrefix = true) {
        apiPrefix = _prepareApiPrefix(apiPrefix);
        if (!moduleInfo)
            return null;
        return `${apiPrefix}/${moduleInfo.pid}/${moduleInfo.name}`;
    }
    mockUrl(moduleInfo, url, apiPrefix = true) {
        apiPrefix = _prepareApiPrefix(apiPrefix);
        if (url && url.charAt(0) === '/')
            return `${apiPrefix}${url}`;
        const prefix = this.parseUrlFromModuleInfo(moduleInfo, apiPrefix);
        return url ? `${prefix}/${url}` : `${prefix}/`;
    }
    async mockCtx(options) {
        options = options || {};
        const locale = options.locale;
        const subdomain = options.subdomain !== undefined ? options.subdomain : '';
        const module = options.module;
        const ctx = await this.app.meta.util.createAnonymousContext({ locale, subdomain, module });
        return ctx;
    }
}
exports.AppMockUtil = AppMockUtil;
function _prepareApiPrefix(apiPrefix) {
    if (typeof apiPrefix === 'string')
        return apiPrefix;
    return apiPrefix ? '/api' : '';
}
//# sourceMappingURL=mockUtil.js.map