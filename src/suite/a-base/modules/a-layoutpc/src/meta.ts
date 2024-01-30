import schemas from './meta/validation/schemas.js';
import staticLayouts from './meta/static/layouts.js';
import staticResources from './meta/static/resources.js';
// meta
export const meta = {
  base: {
    resources: {
      button: {
        title: 'Sidebar Button',
      },
      panel: {
        title: 'Sidebar Panel',
      },
    },
    statics: {
      'a-baselayout.layout': {
        items: staticLayouts,
      },
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
};
