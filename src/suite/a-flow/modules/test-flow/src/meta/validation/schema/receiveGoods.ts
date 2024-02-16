const schemas: any = {};
schemas.receiveGoods = {
  type: 'object',
  properties: {
    // ReceiveGoods Info
    __groupReceiveGoodsInfo: {
      ebType: 'group-flatten',
      ebTitle: 'ReceiveGoodsInfo',
    },
    receiveGoodsPics: {
      type: 'string',
      ebType: 'image',
      ebTitle: 'TakePhotos',
      ebParams: {
        max: 3,
      },
      // notEmpty: true,
    },
  },
};
export default schemas;
