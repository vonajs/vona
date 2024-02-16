import { __ThisModule__ } from '../../../resource/this.js';

export default {
  info: {
    bean: 'purchaseOrderDetail',
    title: 'PurchaseOrderDetails',
    model: 'purchaseOrderDetail',
    tableName: 'testFlowPurchaseOrderDetail',
    itemOnly: true,
    detail: {
      inline: true,
      atomClassMain: {
        module: __ThisModule__,
        atomClassName: 'purchaseOrder',
      },
    },
    fields: {
      mappings: {
        atomIdMain: 'atomIdMain',
        lineNo: 'detailLineNo',
        atomName: 'detailName',
      },
    },
    enableRight: false,
    layout: {
      config: {
        atomList: 'layoutAtomListPurchaseOrderDetail',
      },
    },
  },
  actions: {
    create: {},
    read: {},
    write: {},
    delete: {},
    clone: {},
    moveUp: {},
    moveDown: {},
  },
  validator: 'purchaseOrderDetail',
};
