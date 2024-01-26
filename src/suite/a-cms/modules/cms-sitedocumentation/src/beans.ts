const versionManager = require('./bean/version.manager.js');
const atomDocument = require('./bean/atom.document.js');

export default {
  // version
  'version.manager': {
    bean: versionManager,
  },
  // atom
  'atom.document': {
    bean: atomDocument,
  },
};
