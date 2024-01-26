import versionManager from './bean/version.manager.js';
import eventAccountMigration from './bean/event.accountMigration.js';
import atomAuthOpen from './bean/atom.authOpen.js';
import authProviderOpen from './bean/auth.provider.open.js';
import localToken from './bean/local.token.js';
import beanAuthOpen from './bean/bean.authOpen.js';

export default {
  // version
  'version.manager': {
    bean: versionManager,
  },
  // event
  'event.accountMigration': {
    bean: eventAccountMigration,
  },
  // atom
  'atom.authOpen': {
    bean: atomAuthOpen,
  },
  // auth.provider
  'auth.provider.open': {
    bean: authProviderOpen,
  },
  // local
  'local.token': {
    bean: localToken,
  },
  // global
  authOpen: {
    bean: beanAuthOpen,
    global: true,
  },
};
