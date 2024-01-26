import schemas from './meta/validation/schemas.js';
import flowNodes from './meta/flow/nodes.js';
import flowEdges from './meta/flow/edges.js';
const meta = {
  base: {
    atoms: {},
  },
  validation: {
    validators: {},
    schemas,
  },
  flow: {
    nodes: flowNodes,
    edges: flowEdges,
  },
};
export default meta;
