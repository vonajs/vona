import versionManager from './bean/version.manager.js';
import beanSummer from './bean/bean.summer.js';
import localCache from './bean/local.cache.js';
import localMem from './bean/local.mem.js';
import localRedis from './bean/local.redis.js';
import localFetch from './bean/local.fetch.js';
import broadcastMemDel from './bean/broadcast.memDel.js';
import broadcastMemMultiDel from './bean/broadcast.memMultiDel.js';
import broadcastMemClear from './bean/broadcast.memClear.js';

export default {
  // version
  'version.manager': {
    bean: versionManager,
  },
  // local
  'local.cache': {
    bean: localCache,
  },
  'local.mem': {
    bean: localMem,
  },
  'local.redis': {
    bean: localRedis,
  },
  'local.fetch': {
    bean: localFetch,
  },
  // broadcast
  'broadcast.memDel': {
    bean: broadcastMemDel,
  },
  'broadcast.memMultiDel': {
    bean: broadcastMemMultiDel,
  },
  'broadcast.memClear': {
    bean: broadcastMemClear,
  },
  // summer
  summer: {
    bean: beanSummer,
    global: true,
  },
};
