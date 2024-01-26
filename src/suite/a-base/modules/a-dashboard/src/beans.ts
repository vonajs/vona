const versionManager = require('./bean/version.manager.js');
const atomDashboard = require('./bean/atom.dashboard.js');

export default {
  // version
  'version.manager': {
    bean: versionManager,
  },
  // atom
  'atom.dashboard': {
    bean: atomDashboard,
  },
};
