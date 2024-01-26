const versionManager = require('./bean/version.manager.js');
const beanFile = require('./bean/bean.file.js');

export default {
  // version
  'version.manager': {
    bean: versionManager,
  },
  // global
  file: {
    bean: beanFile,
    global: true,
  },
};
