export * from '../bean/version.manager.js';
export * from '../bean/bean.pinyin.js';

import { BeanPinyin } from '../bean/bean.pinyin.js';

export interface IBeanRecord {
  pinyin: BeanPinyin;
}
