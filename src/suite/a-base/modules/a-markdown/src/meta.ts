import schemas from './meta/validation/schemas.js';
const meta = {
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
export default meta;
