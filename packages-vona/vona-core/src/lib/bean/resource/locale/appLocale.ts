import type { ILocaleInfos, IModuleLocale, IModuleLocaleText } from './type.ts';
import * as localeutil from '@cabloy/localeutil';
import { BeanSimple } from '../../beanSimple.ts';
import { LocaleModuleNameSeparator } from './type.ts';

export class AppLocale extends BeanSimple {
  get locale(): keyof ILocaleInfos {
    return this.ctx.locale;
  }

  set locale(value: keyof ILocaleInfos) {
    this.ctx.locale = value;
  }

  /** @internal */
  public createLocaleText(moduleScope?: string): IModuleLocaleText {
    const self = this;
    const getText = function (text: string, ...args: any[]): string {
      return self.getText(false, moduleScope, undefined, text, ...args);
    };
    getText.locale = function <T extends keyof ILocaleInfos>(
      locale: T | undefined,
      text: string,
      ...args: any[]
    ): string {
      return self.getText(false, moduleScope, locale, text, ...args);
    };
    return getText;
  }

  /** @internal */
  public createScopeLocaleText(moduleScope: string, text: string): IModuleLocale {
    const self = this;
    const getText = function (...args: any[]): string {
      return self.getText(false, moduleScope, undefined, text, ...args);
    };
    getText.locale = function <T extends keyof ILocaleInfos>(locale: T | undefined, ...args: any[]): string {
      return self.getText(false, moduleScope, locale, text, ...args);
    };
    return getText;
  }

  public getText<T extends keyof ILocaleInfos>(
    supportCustomMessage: boolean,
    moduleScope: string | undefined,
    locale: T | undefined,
    key: string,
    ...args: any[]
  ): string {
    if (!key) return key;
    const pos = key.indexOf(LocaleModuleNameSeparator);
    if (pos > -1) {
      moduleScope = key.substring(0, pos);
      key = key.substring(pos + LocaleModuleNameSeparator.length);
    }
    return localeutil.getLocaleText(
      supportCustomMessage,
      moduleScope ? this.app.meta.localeModules[moduleScope] : undefined,
      this.app.meta.locales,
      locale || this.locale,
      key,
      ...args,
    );
  }
}
