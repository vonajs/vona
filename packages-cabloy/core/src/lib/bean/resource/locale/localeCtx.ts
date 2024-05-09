import * as localeutil from '@cabloy/localeutil';
import { BeanSimple } from '../../beanSimple.js';
import { IModuleLocale, IModuleLocaleText } from './type.js';

export class CtxLocale extends BeanSimple {
  get locale() {
    return this.ctx.locale;
  }

  set locale(value) {
    this.ctx.locale = value;
  }

  /** @internal */
  public createLocaleText(): IModuleLocaleText {
    const self = this;
    const getText = function (text: string, ...args: any[]): string {
      return self.getText(undefined, self.locale, text, ...args);
    };
    getText.locale = function (locale: string | undefined | null, text: string, ...args: any[]): string {
      return self.getText(undefined, locale || self.locale, text, ...args);
    };
    return getText;
  }

  /** @internal */
  public createScopeLocaleText(moduleScope: string, text: string): IModuleLocale {
    const self = this;
    const getText = function (...args: any[]): string {
      return self.getText(moduleScope, self.locale, text, ...args);
    };
    getText.locale = function (locale: string | undefined | null, ...args: any[]): string {
      return self.getText(moduleScope, locale || self.locale, text, ...args);
    };
    return getText;
  }

  public getText(moduleScope: string | undefined, locale: string | undefined, key: string, ...args: any[]): string {
    return localeutil.getLocaleText(
      moduleScope ? this.app.meta.localeModules[moduleScope] : undefined,
      this.app.meta.locales,
      locale ?? this.locale,
      key,
      ...args,
    );
  }
}
