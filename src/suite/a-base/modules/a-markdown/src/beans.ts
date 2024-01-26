import versionManager from './bean/version.manager.js';
import beanMarkdown from './bean/bean.markdown.js';

export default {
  // version
  'version.manager': {
    bean: versionManager,
  },
  // global
  markdown: {
    bean: beanMarkdown,
    global: true,
  },
};
