import versionManager from './bean/version.manager.js';
import beanMessage from './bean/bean.message.js';
import statsMessage from './bean/stats.message.js';
import localIoMessageUniformBase from './bean/local.ioMessageUniformBase.js';

export default {
  // version
  'version.manager': {
    bean: versionManager,
  },
  // global
  message: {
    bean: beanMessage,
    global: true,
  },
  // stats
  'stats.message': {
    bean: statsMessage,
  },
  // local
  'local.ioMessageUniformBase': {
    bean: localIoMessageUniformBase,
  },
};
