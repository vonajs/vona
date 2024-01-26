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
    schemas: {},
  },
  stats: {
    providers: {
      message: {
        user: true,
        bean: 'message',
        dependents: ['a-user:user'],
      },
    },
  },
};
export default meta;
