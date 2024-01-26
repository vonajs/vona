import { Bean, BeanBase } from '@cabloy/core';

const py = require('pinyin-pro');

@Bean()
export class BeanPinyin extends BeanBase {
  translate({ text, options }) {
    return py.pinyin(text, options);
  }

  match({ text, pinyin, options }) {
    return py.match(text, pinyin, options);
  }

  convert({ pinyin, options }) {
    return py.convert(pinyin, options);
  }

  custom({ config }) {
    return py.customPinyin(config);
  }

  html({ text, options }) {
    return py.html(text, options);
  }

  polyphonic({ text, options }) {
    return py.polyphonic(text, options);
  }
}
