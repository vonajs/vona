const schemas: any = {};
// detail
const __atomParams = {
  target: '_self',
  atomClass: {
    module: 'test-flow',
    atomClassName: 'product',
  },
  selectOptions: {},
  displayName: 'detailCode',
  mapper: {
    productCode: 'detailCode',
    atomName: 'detailName',
    productPrice: 'price',
  },
};
const __display = {
  expression: '!!detailCodeId',
  dependencies: ['detailCodeId'],
  // host: {
  //   stage: 'draft', // draft/formal/history
  //   mode: 'edit', // view
  // },
};
schemas.purchaseOrderDetail = {
  type: 'object',
  properties: {
    detailCodeId: {
      type: 'number',
      ebType: 'atom',
      ebTitle: 'Product Code',
      ebParams: __atomParams,
      notEmpty: true,
    },
    detailCode: {
      type: 'string',
    },
    detailName: {
      type: 'string',
      ebType: 'text',
      ebTitle: 'Product Name',
      notEmpty: true,
      ebDisplay: __display,
    },
    price: {
      type: 'number',
      ebType: 'text',
      ebTitle: 'Price',
      ebParams: {
        currency: true,
      },
      ebDisplay: __display,
    },
    quantity: {
      type: 'number',
      ebType: 'text',
      ebTitle: 'Quantity',
      ebDisplay: __display,
    },
    amount: {
      type: 'number',
      ebType: 'text',
      ebTitle: 'Amount',
      ebComputed: {
        expression: 'price * quantity',
        dependencies: 'price,quantity',
      },
      ebParams: {
        currency: true,
      },
      ebReadOnly: false,
      ebDisplay: __display,
    },
  },
};
export default schemas;
