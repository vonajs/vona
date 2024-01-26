const auth = require('./meta/passport/auth.js');
const schemas = require('./meta/validation/schemas.js');
export default {
  auth,
  validation: {
    validators: {},
    schemas,
  },
};
