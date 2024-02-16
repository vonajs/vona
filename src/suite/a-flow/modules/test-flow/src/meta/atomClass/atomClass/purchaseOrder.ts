export default {
  info: {
    bean: 'purchaseOrder',
    title: 'Purchase Order',
    model: 'purchaseOrder',
    tableName: 'testFlowPurchaseOrder',
    flow: {
      stage: 'formal',
    },
    fields: {
      mappings: {
        userIds: 'payMoneyPerson,receiveGoodsPerson',
      },
      dicts: {
        atomState: {
          formal: {
            dictKey: null,
            // dictKey: 'test-flow:dictPurchaseOrderState',
          },
        },
      },
    },
    layout: {
      config: {
        atomList: 'layoutAtomListPurchaseOrder',
      },
    },
  },
  actions: {},
  validator: 'purchaseOrder',
  search: {
    validator: 'purchaseOrderSearch',
  },
};
