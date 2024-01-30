import schemas from './meta/validation/schemas.js';
import staticResources from './meta/static/resources.js';
export const meta = {
  base: {
    atoms: {},
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
};
