import schemas from './meta/validation/schemas.js';
import staticLayouts from './meta/static/layouts.js';
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
    validators: {},
    keywords: {},
    schemas,
  },
};
export default meta;
