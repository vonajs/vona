import schemas from './meta/validation/schemas.js';
import staticLayouts from './meta/static/layouts.js';
// nodes
import flowNodes from './meta/flow/nodes.js';
// meta
const meta = {
  base: {
    atoms: {},
    statics: {
      'a-baselayout.layout': {
        items: staticLayouts,
      },
    },
  },
  validation: {
    validators: {
      // startEventAtom
      startEventAtom: {
        schemas: 'startEventAtom,activityUserTask',
      },
      // endEventAtom
      endEventAtom: {
        schemas: 'endEventAtom',
      },
      // activityUserTask
      activityUserTask: {
        schemas: 'activityUserTask',
      },
    },
    keywords: {},
    schemas,
  },
  flow: {
    nodes: flowNodes,
  },
  stats: {
    providers: {
      taskClaimings: {
        user: true,
        bean: 'taskClaimings',
      },
      taskHandlings: {
        user: true,
        bean: 'taskHandlings',
      },
      taskClaimingsHandlings: {
        user: true,
        bean: {
          module: 'a-stats',
          name: 'deps',
        },
        dependencies: ['a-flowtask:taskClaimings', 'a-flowtask:taskHandlings'],
      },
    },
  },
};
export default meta;
