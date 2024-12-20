import schemas from './meta/validation/schemas.js';
import staticLayouts from './meta/static/layouts.js';
import staticResources from './meta/static/resources.js';
export const meta = {
  base: {
    atoms: {},
    statics: {
      'a-baselayout:layout': {
        items: staticLayouts,
      },
      'a-base:resource': {
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
