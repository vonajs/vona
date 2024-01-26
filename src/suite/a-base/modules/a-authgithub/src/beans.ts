import versionManager from './bean/version.manager.js';
import authProviderGithub from './bean/auth.provider.github.js';

export default {
  // version
  'version.manager': {
    bean: versionManager,
  },
  // auth.provider
  'auth.provider.github': {
    bean: authProviderGithub,
  },
};
