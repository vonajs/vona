import schemas from './meta/validation/schemas.js';
import staticFlowDefs from './meta/static/flowDefs.js';
import flowNodes from './meta/flow/nodes.js';
const meta = {
  base: {
    atoms: {},
    statics: {
      'a-flow.flowDef': {
        items: staticFlowDefs,
      },
    },
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
export default meta;
