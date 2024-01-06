export default function (Vue, util) {
  const hostUtil = function (options) {
    return {
      text(...args) {
        const locale = options && options.locale;
        if (locale) return Vue.prototype.$text.locale(locale, ...args);
        return Vue.prototype.$text(...args);
      },
      url(str) {
        if (str && (str.indexOf('http://') === 0 || str.indexOf('https://') === 0)) return this.escapeURL(str);
        const baseURL = util.getBaseURL();
        if (str[0] !== '/') str = '/' + str;
        return baseURL + this.escapeURL(str);
      },
      urlFront(str) {
        if (str && (str.indexOf('http://') === 0 || str.indexOf('https://') === 0)) return this.escapeURL(str);
        const baseURL = window.location.origin;
        if (str[0] !== '/') str = '/' + str;
        return baseURL + this.escapeURL(str);
      },
      escapeHtml(str) {
        return util.escapeHtml(str);
      },
      escapeURL(str) {
        return util.escapeURL(str);
      },
      performAction({ method, url, body }) {
        return Vue.prototype.$meta.api[method.toLowerCase()](url, body);
      },
      navigate(url, _options) {
        options.ctx.$view.navigate(url, _options);
      },
    };
  };
  return hostUtil;
}
