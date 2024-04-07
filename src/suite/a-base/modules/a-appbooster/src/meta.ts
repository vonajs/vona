import schemas from './meta/validation/schemas.js';
// static
import staticApps from './meta/static/apps.js';
import staticLayouts from './meta/static/layouts.js';
import staticResources from './meta/static/resources.js';
export const meta = {
  base: {
    atoms: {},
    statics: {
      'a-app:app': {
        items: staticApps,
      },
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
  index: {
    indexes: {},
  },
};
