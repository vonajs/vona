const versionManager = require('./bean/version.manager.js');
const beanPinyin = require('./bean/bean.pinyin.js');

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
