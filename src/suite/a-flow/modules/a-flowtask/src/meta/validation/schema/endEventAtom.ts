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
export default schemas;
