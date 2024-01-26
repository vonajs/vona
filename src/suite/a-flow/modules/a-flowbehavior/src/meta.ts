import schemas from './meta/validation/schemas.js';
import flowBehaviors from './meta/flow/behaviors.js';
const meta = {
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
export default meta;
