import versionManager from './bean/version.manager.js';
import eventAccountMigration from './bean/event.accountMigration.js';
import authProviderSimple from './bean/auth.provider.simple.js';
import localSimple from './bean/local.simple.js';
import beanAuthSimple from './bean/bean.authSimple.js';

export default {
  // version
  'version.manager': {
    bean: versionManager,
  },
  // event
  'event.accountMigration': {
    bean: eventAccountMigration,
  },
  // auth.provider
  'auth.provider.simple': {
    bean: authProviderSimple,
  },
  // local
  'local.simple': {
    bean: localSimple,
  },
  // global
  authSimple: {
    bean: beanAuthSimple,
    global: true,
  },
};
