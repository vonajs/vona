export * from '../bean/version.manager.js';
export * from '../bean/bean.pinyin.js';

import { BeanPinyin } from '../bean/bean.pinyin.js';

declare module '@cabloy/core' {
  export interface IBeanRecord {
    pinyin: BeanPinyin;
  }
}
