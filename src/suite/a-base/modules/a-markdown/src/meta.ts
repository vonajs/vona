import schemas from './meta/validation/schemas.js';
export const meta = {
  base: {
    atoms: {},
    resources: {
      block: {
        title: 'Markdown Block',
      },
    },
  },
  validation: {
    validators: {},
    keywords: {},
    schemas,
  },
};
