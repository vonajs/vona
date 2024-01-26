import versionManager from './bean/version.manager.js';
import atomApp from './bean/atom.app.js';

export default {
  // version
  'version.manager': {
    bean: versionManager,
  },
  // atom
  'atom.app': {
    bean: atomApp,
  },
};
