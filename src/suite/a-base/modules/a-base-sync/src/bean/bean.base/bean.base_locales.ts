const _locales = {};

module.exports = class Base {
  locales() {
    if (!_locales[this.ctx.locale]) {
      _locales[this.ctx.locale] = this._prepareLocales();
    }
    return _locales[this.ctx.locale];
  }

  _prepareLocales() {
    const locales = [];
    const config = this.ctx.config.module(moduleInfo.relativeName);
    for (const locale in config.locales) {
      locales.push({
        title: this.ctx.text(config.locales[locale]),
        value: locale,
      });
    }
    return locales;
  }
};
