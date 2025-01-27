import { BeanSimple, IMonkeySystem, VonaContext } from 'vona';
import { __ThisModule__ } from './.metadata/this.js';

const SymbolLocale = Symbol('SymbolLocale');
const SymbolLocaleOrigin = Symbol('SymbolLocaleOrigin');

export class Monkey extends BeanSimple implements IMonkeySystem {
  createContext(context: VonaContext): void {
    const options = this.bean.scope(__ThisModule__).config.i18n;
    const defaultLocale = options.defaultLocale;
    const queryField = options.queryField;
    const cookieField = options.cookieField;
    const cookieDomain = options.cookieDomain;
    const localeAlias = options.localeAlias;
    const writeCookie = options.writeCookie;
    const cookieMaxAge = options.cookieMaxAge;
    const localeNames = Object.keys(this.app.meta.locales);
    context.__getLocale = function () {
      if (this[SymbolLocale]) {
        return this[SymbolLocale];
      }

      const cookieLocale = this.cookies.get(cookieField, { signed: false });

      // 1. Query
      let locale = this.query[queryField];
      let localeOrigin = 'query';

      // 2. Cookie
      if (!locale) {
        locale = cookieLocale;
        localeOrigin = 'cookie';
      }

      // 3. Header
      if (!locale) {
        // Accept-Language: zh-CN,zh;q=0.5
        // Accept-Language: zh-CN
        let languages = this.acceptsLanguages();
        if (languages) {
          if (Array.isArray(languages)) {
            if (languages[0] === '*') {
              languages = languages.slice(1);
            }
            if (languages.length > 0) {
              for (let i = 0; i < languages.length; i++) {
                const lang = formatLocale(languages[i]);
                if (localeNames.includes(lang) || localeAlias[lang]) {
                  locale = lang;
                  localeOrigin = 'header';
                  break;
                }
              }
            }
          } else {
            locale = languages;
            localeOrigin = 'header';
          }
        }

        // all missing, set it to defaultLocale
        if (!locale) {
          locale = defaultLocale;
          localeOrigin = 'default';
        }
      }

      // cookie alias
      if (locale in localeAlias) {
        locale = localeAlias[locale];
      }

      locale = formatLocale(locale);

      // validate locale
      if (!localeNames.includes(locale)) {
        locale = defaultLocale;
      }

      // if header not send, set the locale cookie
      if (writeCookie && cookieLocale !== locale && !this.headerSent) {
        updateCookie(this, locale, cookieField, cookieMaxAge, cookieDomain);
      }
      this[SymbolLocale] = locale;
      this[SymbolLocaleOrigin] = localeOrigin;
      return locale;
    };
    context.__setLocale = function (locale) {
      this[SymbolLocale] = locale;
      this[SymbolLocaleOrigin] = 'set';
      updateCookie(this, locale, cookieField, cookieMaxAge, cookieDomain);
    };
  }
}

function formatLocale(locale) {
  // support zh_CN, en_US => zh-CN, en-US
  return locale.replace('_', '-').toLowerCase();
}

function updateCookie(ctx, locale, cookieField, cookieMaxAge, cookieDomain) {
  const cookieOptions = {
    // make sure brower javascript can read the cookie
    httpOnly: false,
    maxAge: cookieMaxAge,
    signed: false,
    domain: cookieDomain,
    overwrite: true,
  };
  ctx.cookies.set(cookieField, locale, cookieOptions);
}
