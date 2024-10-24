import atomClasses from './meta/atomClass/atomClasses.js';
import schemas from './meta/validation/schemas.js';
import keywords from './meta/validation/keywords.js';
// socketio
import socketioTest from './meta/socketio/test.js';
import socketioSimpleChat from './meta/socketio/simpleChat.js';
// static
import staticApps from './meta/static/apps.js';
import staticDashboards from './meta/static/dashboards.js';
import staticLayouts from './meta/static/layouts.js';
import staticResources from './meta/static/resources.js';
import staticDicts from './meta/static/dicts.js';
import staticRoles from './meta/static/roles.js';
// cli commands
import cliCommands from './meta/cli/commands.js';
// icons
import iconGroups from './meta/icons/groups.js';
import { VonaApplication } from 'vona';
// meta
export const meta = (app: VonaApplication) => {
  const meta: any = {};

  app.bean.util.extend(meta, {
    base: {
      atoms: atomClasses,
      statics: {
        'a-app:app': {
          items: staticApps,
        },
        'a-dashboard:dashboard': {
          items: staticDashboards,
        },
        'a-baselayout:layout': {
          items: staticLayouts,
        },
        'a-base:resource': {
          items: staticResources,
        },
        'a-dict:dict': {
          items: staticDicts,
        },
        'a-base:role': {
          items: staticRoles,
        },
      },
    },
    validation: {
      validators: {
        userTest: {
          schemas: 'settingsUser,settingsUserExtra',
        },
        instanceTest: {
          schemas: 'settingsInstance',
        },
      },
      keywords,
      schemas,
    },
    cli: {
      commands: cliCommands,
    },
    settings: {
      user: {
        validator: 'userTest',
      },
      instance: {
        validator: 'instanceTest',
      },
    },
    event: {
      implementations: {
        'a-base:loginInfo': 'loginInfoDashboard',
      },
    },
    index: {
      indexes: {
        testPartyExpense: 'createdAt,updatedAt,atomIdMain',
        testParty: 'createdAt,updatedAt,atomId,partyTypeCode',
      },
    },
    socketio: {
      messages: {
        test: socketioTest,
        simpleChat: socketioSimpleChat,
      },
    },
    stats: {
      providers: {
        tasksUser: {
          user: true,
          bean: 'tasksUser',
        },
        tasksInstance: {
          user: false,
          bean: 'tasksInstance',
          dependencies: 'tasksUser',
        },
      },
    },
    icon: {
      groups: iconGroups,
    },
  });

  // only for test
  if (app.meta.isTest) {
    // meta
    app.bean.util.extend(meta, {
      event: {
        declarations: {
          hello: 'This is a test for event',
        },
        implementations: {
          'test-party:hello': 'helloEcho',
          'a-base:userVerify': 'userVerify',
          'a-base:loginInfo': 'loginInfo',
        },
      },
      sequence: {
        providers: {
          test: {
            bean: 'test',
            start: 0,
          },
        },
      },
    });
  }

  return meta;
};
