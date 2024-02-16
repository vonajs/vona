const schemas: any = {};
// product
schemas.product = {
  type: 'object',
  properties: {
    atomName: {
      type: 'string',
      ebType: 'text',
      ebTitle: 'Product Name',
      notEmpty: true,
    },
    productCode: {
      type: 'string',
      ebType: 'text',
      ebTitle: 'Product Code',
      notEmpty: true,
      'x-productCode': true,
    },
    productPrice: {
      type: 'number',
      ebType: 'text',
      ebTitle: 'Product Price',
      ebParams: {
        currency: true,
      },
      // notEmpty: true,
    },
  },
};
// product
schemas.productSearch = {
  type: 'object',
  properties: {
    productCode: {
      type: 'string',
      ebType: 'text',
      ebTitle: 'Product Code',
    },
  },
};
export default schemas;
