import versionManager from './bean/version.manager.js';
import localBuild from './bean/local.build.js';
import localRender from './bean/local.render.js';
import localSite from './bean/local.site.js';
import queueRender from './bean/queue.render.js';
import startupRegisterAllWatchers from './bean/startup.registerAllWatchers.js';
import startupRegisterDevelopment from './bean/startup.registerDevelopment.js';
import atomArticle from './bean/atom.article.js';
import beanCms from './bean/bean.cms.js';
import ioMessageHotloadFile from './bean/io.message.hotloadFile.js';

export default {
  // version
  'version.manager': {
    bean: versionManager,
  },
  // local
  'local.build': {
    bean: localBuild,
  },
  'local.render': {
    bean: localRender,
  },
  'local.site': {
    bean: localSite,
  },
  // queue
  'queue.render': {
    bean: queueRender,
  },
  // startup
  'startup.registerAllWatchers': {
    bean: startupRegisterAllWatchers,
  },
  'startup.registerDevelopment': {
    bean: startupRegisterDevelopment,
  },
  // atom
  'atom.article': {
    bean: atomArticle,
  },
  // global
  cms: {
    bean: beanCms,
    global: true,
  },
  // io
  'io.message.hotloadFile': {
    bean: ioMessageHotloadFile,
  },
};
