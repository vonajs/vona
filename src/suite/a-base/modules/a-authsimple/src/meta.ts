// auth
const auth = require('./meta/passport/auth.js');
const keywords = require('./meta/validation/keywords.js');
const schemas = require('./meta/validation/schemas.js');
export default {
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
