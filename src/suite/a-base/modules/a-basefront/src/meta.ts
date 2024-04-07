import schemas from './meta/validation/schemas.js';
import staticLayouts from './meta/static/layouts.js';
// meta
export const meta = {
  base: {
    statics: {
      'a-baselayout:layout': {
        items: staticLayouts,
      },
    },
  },
  validation: {
    validators: {},
    schemas,
  },
};
