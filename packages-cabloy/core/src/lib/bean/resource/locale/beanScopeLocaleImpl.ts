import { CabloyContext, IModuleLocale } from '../../../../index.js';

export function BeanScopeLocaleImpl(ctx: CabloyContext, _moduleScope: string, text: string): IModuleLocale {
  const getText = function (...args: any[]): string {
    return ctx.text(text, ...args);
  };
  getText.locale = function (locale, ...args: any[]): string {
    return ctx.text.locale(locale, text, ...args);
  };
  return getText;
}
