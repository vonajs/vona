import { CabloyContext, IModuleLocale } from '../../../../index.js';

export function BeanScopeLocaleImpl(ctx: CabloyContext, moduleScope: string, text: string): IModuleLocale {
  const getText = function (...args: any[]): string {
    return ctx.textModule(moduleScope, text, ...args);
  };
  getText.locale = function (locale, ...args: any[]): string {
    return ctx.textModule.locale(moduleScope, locale, text, ...args);
  };
  return getText;
}
