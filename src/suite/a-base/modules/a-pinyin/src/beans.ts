import versionManager from './bean/version.manager.js';
import beanPinyin from './bean/bean.pinyin.js';

export default {
  // version
  'version.manager': {
    bean: versionManager,
  },
  // global
  pinyin: {
    bean: beanPinyin,
    global: true,
  },
};
