import versionManager from './bean/version.manager.js';
import cliDefaultList from './bean/cli.default.list.js';
import cliTokenAdd from './bean/cli.token.add.js';
import cliTokenDelete from './bean/cli.token.delete.js';
import cliTokenList from './bean/cli.token.list.js';
import cliToolsBabel from './bean/cli.tools.babel.js';
import cliToolsIcons from './bean/cli.tools.icons.js';
import cliToolsDemo from './bean/cli.tools.demo.js';
import cliCreateSuite from './bean/cli.create.suite.js';
import cliCreateModule from './bean/cli.create.module.js';
import cliCreateApp from './bean/cli.create.app.js';
import cliCreateAtom from './bean/cli.create.atom.js';
import cliCreateItemOnly from './bean/cli.create.itemOnly.js';
import cliCreateDetail from './bean/cli.create.detail.js';
import cliCreateAtomAction from './bean/cli.create.atomAction.js';
import cliCreateController from './bean/cli.create.controller.js';
import cliCreatePage from './bean/cli.create.page.js';
import cliCreatePagex from './bean/cli.create.pagex.js';
import cliFrontRenderTableCell from './bean/cli.front.renderTableCell.js';
import cliStoreSync from './bean/cli.store.sync.js';
import cliStorePublish from './bean/cli.store.publish.js';
import cliGitCommit from './bean/cli.git.commit.js';
import localUtils from './bean/local.utils.js';

const beans = {
  // version
  'version.manager': {
    bean: versionManager,
  },
  // cli
  'cli.default.list': {
    bean: cliDefaultList,
  },
  'cli.token.add': {
    bean: cliTokenAdd,
  },
  'cli.token.delete': {
    bean: cliTokenDelete,
  },
  'cli.token.list': {
    bean: cliTokenList,
  },
  'cli.tools.babel': {
    bean: cliToolsBabel,
  },
  'cli.tools.icons': {
    bean: cliToolsIcons,
  },
  'cli.tools.demo': {
    bean: cliToolsDemo,
  },
  'cli.create.suite': {
    bean: cliCreateSuite,
  },
  'cli.create.module': {
    bean: cliCreateModule,
  },
  'cli.create.app': {
    bean: cliCreateApp,
  },
  'cli.create.atom': {
    bean: cliCreateAtom,
  },
  'cli.create.itemOnly': {
    bean: cliCreateItemOnly,
  },
  'cli.create.detail': {
    bean: cliCreateDetail,
  },
  'cli.create.atomAction': {
    bean: cliCreateAtomAction,
  },
  'cli.create.controller': {
    bean: cliCreateController,
  },
  'cli.create.page': {
    bean: cliCreatePage,
  },
  'cli.create.pagex': {
    bean: cliCreatePagex,
  },
  'cli.front.renderTableCell': {
    bean: cliFrontRenderTableCell,
  },
  'cli.store.sync': {
    bean: cliStoreSync,
  },
  'cli.store.publish': {
    bean: cliStorePublish,
  },
  'cli.git.commit': {
    bean: cliGitCommit,
  },
  // local
  'local.utils': {
    bean: localUtils,
  },
};
export default beans;
