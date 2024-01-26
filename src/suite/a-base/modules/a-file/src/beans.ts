import versionManager from './bean/version.manager.js';
import beanFile from './bean/bean.file.js';

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
