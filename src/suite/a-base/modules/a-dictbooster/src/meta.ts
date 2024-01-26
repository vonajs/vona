import schemas from './meta/validation/schemas.js';
import staticDicts from './meta/static/dicts.js';
const meta = {
  base: {
    atoms: {},
    statics: {
      'a-dict.dict': {
        items: staticDicts,
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
