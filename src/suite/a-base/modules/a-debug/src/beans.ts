const versionManager = require('./bean/version.manager.js');
const beanDebug = require('./bean/bean.debug.js');

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
