import versionManager from './bean/version.manager.js';
import atomDict from './bean/atom.dict.js';
import beanDict from './bean/bean.dict.js';

export default {
  // version
  'version.manager': {
    bean: versionManager,
  },
  // atom
  'atom.dict': {
    bean: atomDict,
  },
  // global
  dict: {
    bean: beanDict,
    global: true,
  },
};
