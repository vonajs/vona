import versionManager from './bean/version.manager.js';
import queueStats from './bean/queue.stats.js';
import beanStats from './bean/bean.stats.js';
import ioMessageStats from './bean/io.message.stats.js';
import statsDeps from './bean/stats.deps.js';

export default {
  // version
  'version.manager': {
    bean: versionManager,
  },
  // queue
  'queue.stats': {
    bean: queueStats,
  },
  // io
  'io.message.stats': {
    bean: ioMessageStats,
  },
  // global
  stats: {
    bean: beanStats,
    global: true,
  },
  // stats
  'stats.deps': {
    bean: statsDeps,
  },
};
