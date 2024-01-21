import { CabloyContext, IBeanScopeLocale } from '../../../../index.js';

export function BeanScopeLocaleImpl(ctx: CabloyContext, _moduleScope: string, text: string): IBeanScopeLocale {
  const getText = function (...args: any[]): string {
    return ctx.text(text, ...args);
  };
  getText.locale = function (locale, ...args: any[]): string {
    return ctx.text.locale(locale, text, ...args);
  };
  return getText;
}
