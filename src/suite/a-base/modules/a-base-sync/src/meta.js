const atomClasses = require('./meta/atomClass/atomClasses.js');
const keywords = require('./meta/validation/keywords.js');
const schemas = require('./meta/validation/schemas.js');
const staticDicts = require('./meta/static/dicts.js');
const staticResources = require('./meta/static/resources.js');
const staticRoles = require('./meta/static/roles.js');
const socketioComment = require('./meta/socketio/comment.js');
// meta
const meta = {
  base: {
    atoms: atomClasses,
    resources: {
      function: {
        title: 'Function',
        validator: null,
      },
      menu: {
        title: 'AppMenu',
      },
      mine: {
        title: 'MineMenu',
      },
    },
    statics: {
      'a-dict.dict': {
        items: staticDicts,
      },
      'a-base.resource': {
        items: staticResources,
      },
      'a-base.role': {
        items: staticRoles,
      },
    },
  },
  sequence: {
    providers: {
      draft: {
        bean: {
          module: 'a-sequence',
          name: 'simple',
        },
        start: 0,
      },
      userName: {
        bean: {
          module: 'a-sequence',
          name: 'simple',
        },
        start: 0,
      },
      flowAction: {
        bean: {
          module: 'a-sequence',
          name: 'simple',
        },
        start: 10000,
      },
    },
  },
  validation: {
    validators: {},
    keywords: {
      'x-exists': keywords.exists,
    },
    schemas,
  },
  event: {
    declarations: {
      loginInfo: 'Login Info',
      userAdd: 'User Add',
      userVerify: 'User Verify',
      accountMigration: 'Account Migration',
    },
  },
  stats: {
    providers: {
      drafts: {
        user: true,
        bean: {
          module: 'a-stats',
          name: 'deps',
        },
        inheritNameSub: true,
        dependencies: ['a-base:draftsDrafting', 'a-base:draftsFlowing'],
      },
      draftsDrafting: {
        user: true,
        bean: 'draftsCommon',
      },
      draftsFlowing: {
        user: true,
        bean: 'draftsCommon',
      },
      stars: {
        user: true,
        bean: 'stars',
      },
      labels: {
        user: true,
        bean: 'labels',
      },
      starsLabels: {
        user: true,
        bean: 'starsLabels',
        dependencies: ['stars', 'labels'],
        dependents: ['a-user:user'],
      },
    },
  },
  socketio: {
    messages: {
      comment: socketioComment,
    },
  },
};
module.exports = meta;
