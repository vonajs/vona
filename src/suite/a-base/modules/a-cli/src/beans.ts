import versionManager from './bean/version.manager.js';
import localConsole from './bean/local.console.js';
import localHelper from './bean/local.helper.js';
import localTemplate from './bean/local.template.js';
import beanCliBase from './bean/bean.cliBase.js';
import beanCli from './bean/bean.cli.js';

export default {
  // version
  'version.manager': {
    bean: versionManager,
  },
  // local
  'local.helper': {
    bean: localHelper,
  },
  'local.template': {
    bean: localTemplate,
  },
  'local.console': {
    bean: localConsole,
  },
  // global
  cliBase: {
    bean: beanCliBase,
    global: true,
  },
  cli: {
    bean: beanCli,
    global: true,
  },
};
