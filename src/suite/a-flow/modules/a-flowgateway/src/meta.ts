import schemas from './meta/validation/schemas.js';
import flowNodes from './meta/flow/nodes.js';
export const meta = {
  base: {
    atoms: {},
  },
  validation: {
    validators: {},
    keywords: {},
    schemas,
  },
  flow: {
    nodes: flowNodes,
  },
};
