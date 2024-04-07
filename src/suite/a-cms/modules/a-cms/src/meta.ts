import atomClasses from './meta/atomClass/atomClasses.js';
import keywords from './meta/validation/keywords.js';
import schemas from './meta/validation/schemas.js';
// socketio
import socketioHotloadFile from './meta/socketio/hotloadFile.js';
// static
import staticApps from './meta/static/apps.js';
import staticFlowDefs from './meta/static/flowDefs.js';
import staticResources from './meta/static/resources.js';
import staticLayouts from './meta/static/layouts.js';
// meta
export const meta = {
  base: {
    atoms: atomClasses,
    resources: {
      block: {
        title: 'CMS Block',
      },
    },
    statics: {
      'a-app:app': {
        items: staticApps,
      },
      'a-flow:flowDef': {
        items: staticFlowDefs,
      },
      'a-base:resource': {
        items: staticResources,
      },
      'a-baselayout:layout': {
        items: staticLayouts,
      },
    },
  },
  validation: {
    validators: {},
    keywords,
    schemas,
  },
  settings: {
    instance: {
      actionPath: 'config/atomClasses',
    },
  },
  event: {
    implementations: {},
  },
  socketio: {
    messages: {
      hotloadFile: socketioHotloadFile,
    },
  },
};
