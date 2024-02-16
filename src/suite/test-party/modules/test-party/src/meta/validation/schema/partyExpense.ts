const schemas: any = {};
// partyExpense
schemas.partyExpense = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      ebType: 'text',
      ebTitle: 'Name',
      notEmpty: true,
    },
    remark: {
      type: 'string',
      ebType: 'text',
      ebTitle: 'PartyExpenseRemark',
    },
    price: {
      type: 'number',
      ebType: 'text',
      ebTitle: 'Price',
      ebParams: {
        currency: true,
      },
    },
    quantity: {
      type: 'number',
      ebType: 'text',
      ebTitle: 'Quantity',
      notEmpty: true,
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
    },
  },
};
export default schemas;
