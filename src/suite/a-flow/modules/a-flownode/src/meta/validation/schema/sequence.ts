const schemas: any = {};
// sequence
schemas.sequence = {
  type: 'object',
  properties: {
    conditionExpression: {
      type: 'string',
      ebType: 'text',
      ebTitle: 'Condition Expression',
      ebParams: {
        textarea: true,
      },
    },
  },
};
export default schemas;
