import versionManager from './bean/version.manager.js';
import localSessionStore from './bean/local.sessionStore.js';

export default {
  // version
  'version.manager': {
    bean: versionManager,
  },
  // local
  'local.sessionStore': {
    bean: localSessionStore,
  },
};
