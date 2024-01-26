import versionManager from './bean/version.manager.js';
import beanStatus from './bean/bean.status.js';

export default {
  // version
  'version.manager': {
    bean: versionManager,
  },
  // global
  status: {
    bean: beanStatus,
    global: true,
  },
};
