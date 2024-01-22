// const moduleInfo = module.info;

const schemas = {};
// endEventAtom
schemas.endEventAtom = {
  type: 'object',
  properties: {
    atomStateTip: {
      type: 'string',
      ebType: 'text',
      ebTitle: 'AtomStateTip',
    },
  },
};
module.exports = schemas;
