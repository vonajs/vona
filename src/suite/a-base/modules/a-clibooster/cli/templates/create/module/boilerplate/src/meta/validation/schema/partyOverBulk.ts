const schemas: any = {};
// party over
schemas.partyOverBulk = {
  type: 'object',
  properties: {
    // Over Info
    __groupPartyOverInfo: {
      ebType: 'group-flatten',
      ebTitle: 'PartyOverInfo',
    },
    partySummary: {
      type: 'string',
      ebType: 'text',
      ebTitle: 'PartySummary',
      ebParams: {
        // textarea: true,
      },
      default: '',
      notEmpty: true,
    },
  },
};
export default schemas;
