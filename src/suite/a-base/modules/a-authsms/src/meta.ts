// auth
import auth from './meta/passport/auth.js';
import keywords from './meta/validation/keywords.js';
import schemas from './meta/validation/schemas.js';
// static
import staticResources from './meta/static/resources.js';
// meta
export const meta = {
  base: {
    statics: {
      'a-base:resource': {
        items: staticResources,
      },
    },
  },
  auth,
  validation: {
    validators: {},
    keywords: {
      'x-exists': keywords.exists,
    },
    schemas,
  },
  event: {
    implementations: {
      'a-base:accountMigration': 'accountMigration',
    },
  },
};
