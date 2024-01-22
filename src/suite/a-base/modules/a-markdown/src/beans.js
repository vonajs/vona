const versionManager = require('./bean/version.manager.js');
const beanMarkdown = require('./bean/bean.markdown.js');

module.exports = {
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
