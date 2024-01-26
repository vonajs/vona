import versionManager from './bean/version.manager.js';
import beanDetail from './bean/bean.detail.js';

export default {
  // version
  'version.manager': {
    bean: versionManager,
  },
  // global
  detail: {
    bean: beanDetail,
    global: true,
  },
};
