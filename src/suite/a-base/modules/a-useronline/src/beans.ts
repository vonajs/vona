import versionManager from './bean/version.manager.js';
import atomUserOnline from './bean/atom.userOnline.js';
import atomUserOnlineHistory from './bean/atom.userOnlineHistory.js';
import beanUserOnline from './bean/bean.userOnline.js';

export default {
  // version
  'version.manager': {
    bean: versionManager,
  },
  // atom
  'atom.userOnline': {
    bean: atomUserOnline,
  },
  'atom.userOnlineHistory': {
    bean: atomUserOnlineHistory,
  },
  // global
  userOnline: {
    bean: beanUserOnline,
    global: true,
  },
};
