import versionManager from './bean/version.manager.js';
import beanDebug from './bean/bean.debug.js';

export default {
  // version
  'version.manager': {
    bean: versionManager,
  },
  // global
  debug: {
    bean: beanDebug,
    global: true,
  },
};
