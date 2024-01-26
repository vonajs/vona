const versionManager = require('./bean/version.manager.js');
const localSessionStore = require('./bean/local.sessionStore.js');

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
