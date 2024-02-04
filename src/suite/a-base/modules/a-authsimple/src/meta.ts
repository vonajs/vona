// auth
import auth from './meta/passport/auth.js';
import keywords from './meta/validation/keywords.js';
import schemas from './meta/validation/schemas.js';
// meta
export const meta = {
  auth,
  validation: {
    validators: {},
    keywords: {
      'x-exists': keywords.exists,
      'x-passwordForgotEmail': keywords.passwordForgotEmail,
    },
    schemas,
  },
  event: {
    implementations: {
      'a-base:accountMigration': 'accountMigration',
    },
  },
};
