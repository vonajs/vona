import versionManager from './bean/version.manager.js';
import beanShare from './bean/bean.share.js';

export default {
  // version
  'version.manager': {
    bean: versionManager,
  },
  // global
  share: {
    bean: beanShare,
    global: true,
  },
};
