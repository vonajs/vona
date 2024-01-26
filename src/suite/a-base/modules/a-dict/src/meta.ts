import atomClasses from './meta/atomClass/atomClasses.js';
import schemas from './meta/validation/schemas.js';
import staticLayouts from './meta/static/layouts.js';
import staticResources from './meta/static/resources.js';
// meta
const meta = {
  base: {
    atoms: atomClasses,
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
export default meta;
