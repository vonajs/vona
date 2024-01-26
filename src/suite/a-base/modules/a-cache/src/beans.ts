import versionManager from './bean/version.manager.js';
import localDb from './bean/local.db.js';
import localMem from './bean/local.mem.js';
import localRedis from './bean/local.redis.js';
import broadcastMemClear from './bean/broadcast.memClear.js';
import broadcastMemRemove from './bean/broadcast.memRemove.js';
import beanCache from './bean/bean.cache.js';

export default {
  // version
  'version.manager': {
    bean: versionManager,
  },
  // local
  'local.db': {
    bean: localDb,
  },
  'local.mem': {
    bean: localMem,
  },
  'local.redis': {
    bean: localRedis,
  },
  // broadcast
  'broadcast.memClear': {
    bean: broadcastMemClear,
  },
  // broadcast
  'broadcast.memRemove': {
    bean: broadcastMemRemove,
  },
  // global
  cache: {
    bean: beanCache,
    global: true,
  },
};
