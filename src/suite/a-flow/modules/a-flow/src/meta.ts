import schemas from './meta/validation/schemas.js';
import staticResources from './meta/static/resources.js';
import socketioWorkflow from './meta/socketio/workflow.js';
import flowBehaviors from './meta/flow/behaviors.js';
export const meta = {
  base: {
    atoms: {
      flowDef: {
        info: {
          bean: 'flowDef',
          title: 'FlowDefinition',
          tableName: 'aFlowDef',
          tableNameModes: {
            full: 'aFlowDefViewFull',
          },
          inner: true,
          resource: true,
          category: true,
          tag: true,
          comment: false,
          attachment: false,
          history: true,
        },
        actions: {
          write: {
            enableOnStatic: null,
          },
        },
        validator: 'flowDef',
        search: {
          validator: 'flowDefSearch',
        },
      },
    },
    statics: {
      'a-base.resource': {
        items: staticResources,
      },
    },
  },
  validation: {
    validators: {},
    keywords: {},
    schemas,
  },
  stats: {
    providers: {
      flowInitiateds: {
        user: true,
        bean: 'flowInitiateds',
      },
    },
  },
  socketio: {
    messages: {
      workflow: socketioWorkflow,
    },
  },
  flow: {
    behaviors: flowBehaviors,
  },
};
