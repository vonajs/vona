const schemas = require('./meta/validation/schemas.js');
const staticFlowDefs = require('./meta/static/flowDefs.js');
const flowNodes = require('./meta/flow/nodes.js');
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
module.exports = meta;
