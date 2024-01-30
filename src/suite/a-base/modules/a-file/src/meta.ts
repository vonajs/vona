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
  event: {
    declarations: {
      fileUpdateCheck: 'File Update Check',
      fileDownloadCheck: 'File Download Check',
    },
  },
};
