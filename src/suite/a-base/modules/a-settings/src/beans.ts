import versionManager from './bean/version.manager.js';
import beanSettings from './bean/bean.settings.js';

export default {
  // version
  'version.manager': {
    bean: versionManager,
  },
  // global
  settings: {
    bean: beanSettings,
    global: true,
  },
};
