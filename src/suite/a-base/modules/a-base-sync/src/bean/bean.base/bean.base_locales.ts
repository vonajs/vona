import { __ThisModule__ } from '../../resource/this.js';
import { BeanBaseLocaleModules } from './bean.base_localeModules.js';

const _locales: any = {};

export class BeanBaseLocales extends BeanBaseLocaleModules {
  locales() {
    if (!_locales[this.ctx.locale]) {
      _locales[this.ctx.locale] = this._prepareLocales();
    }
    return _locales[this.ctx.locale];
  }

  _prepareLocales() {
    const locales: any[] = [];
    const config = this.ctx.config.module(__ThisModule__);
    for (const locale in config.locales) {
      locales.push({
        title: this.ctx.text(config.locales[locale]),
        value: locale,
      });
    }
    return locales;
  }
}
