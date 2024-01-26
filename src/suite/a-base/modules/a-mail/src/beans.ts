import versionManager from './bean/version.manager.js';
import ioMessageMail from './bean/io.message.mail.js';
import ioChannelMail from './bean/io.channel.mail.js';
import broadcastMailSceneChanged from './bean/broadcast.mailSceneChanged.js';
import startupCacheMailScenes from './bean/startup.cacheMailScenes.js';
import beanMail from './bean/bean.mail.js';
import beanMailSceneCache from './bean/bean.mailSceneCache.js';

export default {
  // version
  'version.manager': {
    bean: versionManager,
  },
  // io
  'io.message.mail': {
    bean: ioMessageMail,
  },
  'io.channel.mail': {
    bean: ioChannelMail,
  },
  // broadcast
  'broadcast.mailSceneChanged': {
    bean: broadcastMailSceneChanged,
  },
  // startup
  'startup.cacheMailScenes': {
    bean: startupCacheMailScenes,
  },
  // global
  mail: {
    bean: beanMail,
    global: true,
  },
  mailSceneCache: {
    bean: beanMailSceneCache,
    global: true,
  },
};
