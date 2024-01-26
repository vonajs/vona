import schemas from './meta/validation/schemas.js';
// static
import staticResources from './meta/static/resources.js';
const meta = {
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
export default meta;
