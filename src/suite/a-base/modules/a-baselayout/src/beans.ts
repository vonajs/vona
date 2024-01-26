const versionManager = require('./bean/version.manager.js');
const atomLayout = require('./bean/atom.layout.js');

export default {
  // version
  'version.manager': {
    bean: versionManager,
  },
  // atom
  'atom.layout': {
    bean: atomLayout,
  },
};
