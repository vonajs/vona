import { Bean, BeanBase } from '@cabloy/core';

import py from 'pinyin-pro';

@Bean()
export class BeanPinyin extends BeanBase {
  translate({ text, options }: any) {
    return py.pinyin(text, options);
  }

  match({ text, pinyin, options }: any) {
    return py.match(text, pinyin, options);
  }

  convert({ pinyin, options }: any) {
    return py.convert(pinyin, options);
  }

  custom({ config }: any) {
    return py.customPinyin(config);
  }

  html({ text, options }: any) {
    return py.html(text, options);
  }

  polyphonic({ text, options }: any) {
    return py.polyphonic(text, options);
  }
}
