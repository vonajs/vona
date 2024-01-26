import versionManager from './bean/version.manager.js';
import beanIcon from './bean/bean.icon.js';

export default {
  // version
  'version.manager': {
    bean: versionManager,
  },
  // global
  icon: {
    bean: beanIcon,
    global: true,
  },
};
