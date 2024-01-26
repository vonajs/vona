import versionManager from './bean/version.manager.js';
import beanProgress from './bean/bean.progress.js';

export default {
  // version
  'version.manager': {
    bean: versionManager,
  },
  // global
  progress: {
    bean: beanProgress,
    global: true,
  },
};
