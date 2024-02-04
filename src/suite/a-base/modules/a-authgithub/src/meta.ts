import auth from './meta/passport/auth.js';
import schemas from './meta/validation/schemas.js';
// meta
export const meta = {
  auth,
  validation: {
    validators: {},
    schemas,
  },
};
