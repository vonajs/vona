const schemas: any = {};
// blockArticleCommentCount
schemas.blockArticleCommentCount = {
  type: 'object',
  properties: {
    interval: {
      type: 'number',
      ebType: 'text',
      ebTitle: 'IntervalMS',
      notEmpty: true,
    },
  },
};
export default schemas;
