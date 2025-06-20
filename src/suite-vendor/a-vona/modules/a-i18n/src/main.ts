import type { IModuleMain, VonaContext } from 'vona';
import type { I18nConfig } from './config/config.ts';
import { BeanSimple } from 'vona';
import { __ThisModule__ } from './.metadata/this.ts';

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
      return __setLocale(this, locale);
    };
  }

  async configLoaded(_config: any) {}
}

function __setLocale(ctx: VonaContext, locale: string) {
  ctx[SymbolLocale] = locale;
  ctx[SymbolLocaleOrigin] = 'set';
}

function __getLocale(ctx: VonaContext, options: I18nConfig) {
  if (ctx[SymbolLocale]) {
    return ctx[SymbolLocale];
  }

  const localeNames = Object.keys(ctx.app.meta.locales);

  const queryField = options.queryField;
  const headerField = options.headerField;
  const cookieField = options.cookieField;

  let locale: string | undefined = '';
  let localeOrigin: string = '';

  const cookieLocale = cookieField && ctx.cookies.get(cookieField, { signed: false });

  // 1. Query
  if (!locale && queryField) {
    locale = ctx.request.query[queryField];
    localeOrigin = 'query';
  }

  // 2. Header
  if (!locale && headerField) {
    locale = ctx.request.headers[headerField] as string;
    localeOrigin = 'header';
  }

  // 3. Cookie
  if (!locale && cookieField) {
    locale = cookieLocale;
    localeOrigin = 'cookie';
  }

  // 4. Header: Accept
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
  }

  // all missing, set it to defaultLocale
  if (!locale) {
    locale = options.defaultLocale;
    localeOrigin = 'default';
  }

  // cookie alias
  if (locale as string in options.localeAlias) {
    locale = options.localeAlias[locale as string];
  }

  locale = formatLocale(locale);

  // validate locale
  if (!localeNames.includes(locale)) {
    locale = options.defaultLocale;
  }

  // if header not send, set the locale cookie
  if (cookieField && options.writeCookie && cookieLocale !== locale && !ctx.headerSent) {
    updateCookie(ctx, options, locale);
  }

  ctx[SymbolLocale] = locale;
  ctx[SymbolLocaleOrigin] = localeOrigin;
  return locale;
}

function updateCookie(ctx: VonaContext, options: I18nConfig, locale: string) {
  const cookieOptions = {
    // make sure brower javascript can read the cookie
    httpOnly: false,
    maxAge: options.cookieMaxAge,
    signed: false,
    domain: options.cookieDomain,
    overwrite: true,
  };
  ctx.cookies.set(options.cookieField!, locale, cookieOptions);
}

function formatLocale(locale) {
  // support zh_CN, en_US => zh-CN, en-US
  return parseTokenSafe(locale).replace('_', '-').toLowerCase();
}

function parseTokenSafe(token?: string) {
  if (!token) return '';
  return token.replace(/[\\.*#%'"`;, ]/g, '');
}
