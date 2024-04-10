import defaultList from './command/default.list.js';
import tokenAdd from './command/token.add.js';
import tokenDelete from './command/token.delete.js';
import tokenList from './command/token.list.js';
import toolsBabel from './command/tools.babel.js';
import toolsIcons from './command/tools.icons.js';
import toolsDemo from './command/tools.demo.js';
import createApp from './command/create.app.js';
import createAtom from './command/create.atom.js';
import createItemOnly from './command/create.itemOnly.js';
import createDetail from './command/create.detail.js';
import createPage from './command/create.page.js';
import renderTableCell from './command/front.renderTableCell.js';
import storeSync from './command/store.sync.js';
import storePublish from './command/store.publish.js';
import gitCommit from './command/git.commit.js';

const commands = {
  default: {
    list: defaultList,
  },
  token: {
    add: tokenAdd,
    delete: tokenDelete,
    list: tokenList,
  },
  tools: {
    babel: toolsBabel,
    icons: toolsIcons,
    demo: toolsDemo,
  },
  create: {
    app: createApp,
    atom: createAtom,
    itemOnly: createItemOnly,
    detail: createDetail,
    page: createPage,
  },
  front: {
    renderTableCell,
  },
  store: {
    sync: storeSync,
    publish: storePublish,
  },
  git: {
    commit: gitCommit,
  },
};
export default commands;
