import schemas from './meta/validation/schemas.js';
import flowBehaviors from './meta/flow/behaviors.js';
export const meta = {
  base: {
    atoms: {},
  },
  validation: {
    validators: {},
    schemas,
  },
  flow: {
    behaviors: flowBehaviors,
  },
};
