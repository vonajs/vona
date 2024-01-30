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
      shareRecordPV: 'Share Record PV',
      shareRecordUV: 'Share Record UV',
    },
  },
};
