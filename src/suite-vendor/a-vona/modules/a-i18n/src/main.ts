import type { IModuleMain, VonaContext } from 'vona';
import { BeanSimple } from 'vona';
import { __ThisModule__ } from './.metadata/this.js';
import type { I18nConfig } from './config/config.js';

const SymbolLocale = Symbol('SymbolLocale');
const SymbolLocaleOrigin = Symbol('SymbolLocaleOrigin');

export class Main extends BeanSimple implements IModuleMain {
  async moduleLoading() {}
  async moduleLoaded() {
    const options = this.bean.scope(__ThisModule__).config.i18n;
    this.app.context.__getLocale = function (this: VonaContext) {
      return __getLocale(this, options);
    };
    this.app.context.__setLocale = function (this: VonaContext, locale: string) {
      return __setLocale(this, locale, options);
    };
  }

  async configLoaded(_config: any) {}
}

function __setLocale(ctx: VonaContext, locale: string, options: I18nConfig) {
  ctx[SymbolLocale] = locale;
  ctx[SymbolLocaleOrigin] = 'set';
  updateCookie(ctx, locale, options.cookieField, options.cookieMaxAge, options.cookieDomain);
}

function __getLocale(ctx: VonaContext, options: I18nConfig) {
  if (ctx[SymbolLocale]) {
    return ctx[SymbolLocale];
  }

  const localeNames = Object.keys(ctx.app.meta.locales);

  const cookieLocale = ctx.cookies.get(options.cookieField, { signed: false });

  // 1. Query
  let locale = ctx.query[options.queryField];
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
    let languages = ctx.acceptsLanguages();
    if (languages) {
      if (Array.isArray(languages)) {
        if (languages[0] === '*') {
          languages = languages.slice(1);
        }
        if (languages.length > 0) {
          for (let i = 0; i < languages.length; i++) {
            const lang = formatLocale(languages[i]);
            if (localeNames.includes(lang) || options.localeAlias[lang]) {
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
      locale = options.defaultLocale;
      localeOrigin = 'default';
    }
  }

  // cookie alias
  if (locale in options.localeAlias) {
    locale = options.localeAlias[locale];
  }

  locale = formatLocale(locale);

  // validate locale
  if (!localeNames.includes(locale)) {
    locale = options.defaultLocale;
  }

  // if header not send, set the locale cookie
  if (options.writeCookie && cookieLocale !== locale && !ctx.headerSent) {
    updateCookie(ctx, locale, options.cookieField, options.cookieMaxAge, options.cookieDomain);
  }
  ctx[SymbolLocale] = locale;
  ctx[SymbolLocaleOrigin] = localeOrigin;
  return locale;
}

function formatLocale(locale) {
  // support zh_CN, en_US => zh-CN, en-US
  return parseTokenSafe(locale).replace('_', '-').toLowerCase();
}

function parseTokenSafe(token?: string) {
  if (!token) return '';
  return token.replace(/[\\\.*#%'"`;, ]/g, '');
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
