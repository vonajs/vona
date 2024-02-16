const schemas: any = {};
schemas.payMoney = {
  type: 'object',
  properties: {
    // PayMoney Info
    __groupPayMoneyInfo: {
      ebType: 'group-flatten',
      ebTitle: 'PayMoneyInfo',
    },
    payMoneyAmount: {
      type: 'integer',
      ebType: 'text',
      ebTitle: 'PayMoneyAmount',
      ebParams: {
        currency: true,
      },
      notEmpty: true,
    },
  },
};
export default schemas;
