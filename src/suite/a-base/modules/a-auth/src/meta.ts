import schemas from './meta/validation/schemas.js';
export const meta = {
  base: {
    atoms: {},
  },
  validation: {
    validators: {},
    keywords: {},
    schemas,
  },
  settings: {
    user: {
      actionPath: '/a/user/user/authentications',
    },
  },
};
