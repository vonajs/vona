import { __ThisModule__ } from '../../../.metadata/this.js';

const schemas: any = {};
// purchase order
// const __display = {
//   expression: '!!_flowDefKey',
//   dependencies: ['_flowDefKey'],
//   // host: {
//   //   stage: 'draft', // draft/formal/history
//   //   mode: 'edit', // view
//   // },
// };
schemas.purchaseOrder = {
  type: 'object',
  properties: {
    // Basic Info
    __groupBasicInfo: {
      ebType: 'group-flatten',
      ebTitle: 'Basic Info',
    },
    atomName: {
      type: 'string',
      ebType: 'text',
      ebTitle: 'Name',
      notEmpty: true,
    },
    description: {
      type: 'string',
      ebType: 'text',
      ebTitle: 'Description',
    },
    _flowDefKey: {
      type: 'string',
      ebType: 'select',
      ebTitle: 'Flow Definition',
      ebOptionsBlankAuto: true,
      ebOptions: [
        { title: 'Test_Flow_No_Workflow', value: 'no_workflow' },
        { title: 'Test_Set01_StartEvent_Atom', value: 'set01_startEventAtom' },
        { title: 'Test_Set01_Atom_UserTask', value: 'set01_atomUserTask' },
        { title: 'Test_Set01_Atom_AssigneesConfirmation', value: 'set01_atomAssigneesConfirmation' },
        { title: 'Test_Set04_Atom_AtomState', value: 'set04_atomState' },
      ],
      notEmpty: true,
    },
    // Stats
    __groupStats: {
      ebType: 'group-flatten',
      ebTitle: 'Details Stats',
    },
    detailsCount: {
      type: 'number',
      ebType: 'detailsStat',
      ebTitle: 'Quantity',
      ebParams: {
        detailClass: {
          module: __ThisModule__,
          atomClassName: 'purchaseOrderDetail',
        },
        summary: {
          type: 'count',
        },
      },
      // ebReadOnly: true,
    },
    detailsAmount: {
      type: 'number',
      ebType: 'detailsStat',
      ebTitle: 'Amount',
      ebParams: {
        detailClass: {
          module: __ThisModule__,
          atomClassName: 'purchaseOrderDetail',
        },
        summary: {
          type: 'sum',
          field: 'amount',
        },
        currency: true,
      },
      ebAutoSubmit: true,
      // ebReadOnly: true,
    },
    // PayMoney Info
    __groupPayMoneyInfo: {
      ebType: 'group-flatten',
      ebTitle: 'PayMoneyInfo',
      ebDisplay: {
        host: {
          stage: 'formal',
        },
      },
    },
    payMoneyPerson: {
      ebType: 'userName',
      ebTitle: 'PayMoneyPerson',
      ebReadOnly: true,
    },
    payMoneyTime: {
      ebType: 'text',
      ebTitle: 'PayMoneyTime',
      ebParams: {
        dateFormat: true,
      },
      ebReadOnly: true,
    },
    payMoneyAmount: {
      ebType: 'text',
      ebTitle: 'PayMoneyAmount',
      ebParams: {
        currency: true,
      },
      ebReadOnly: true,
    },
    // ReceiveGoods Info
    __groupReceiveGoodsInfo: {
      ebType: 'group-flatten',
      ebTitle: 'ReceiveGoodsInfo',
      ebDisplay: {
        host: {
          stage: 'formal',
        },
      },
    },
    receiveGoodsPerson: {
      ebType: 'userName',
      ebTitle: 'ReceiveGoodsPerson',
      ebReadOnly: true,
    },
    receiveGoodsTime: {
      ebType: 'text',
      ebTitle: 'ReceiveGoodsTime',
      ebParams: {
        dateFormat: true,
      },
      ebReadOnly: true,
    },
    receiveGoodsPics: {
      ebType: 'image',
      ebTitle: 'TakePhotos',
      ebParams: {
        max: 3,
      },
      ebReadOnly: true,
    },
    // Details
    __groupDetails: {
      ebType: 'group-flatten',
      ebTitle: 'Details',
      ebGroupWhole: true,
      ebParams: {
        titleHidden: true,
      },
    },
    details: {
      ebType: 'details',
      ebTitle: 'Details',
      ebParams: {
        atomClass: {
          module: __ThisModule__,
          atomClassName: 'purchaseOrderDetail',
        },
      },
      // ebDisplay: __display,
    },
    // __groupDetails2: {
    //   ebType: 'group-flatten',
    //   ebTitle: 'Details',
    //   ebGroupWhole: true,
    //   ebParams: {
    //     titleHidden: true,
    //   },
    // },
    // details_2: {
    //   ebType: 'details',
    //   ebTitle: 'Details 2',
    //   ebParams: {
    //     atomClass: {
    //       module: __ThisModule__,
    //       atomClassName: 'purchaseOrderDetail',
    //     },
    //   },
    // },
  },
};
// purchase order search
schemas.purchaseOrderSearch = {
  type: 'object',
  properties: {
    description: {
      type: 'string',
      ebType: 'text',
      ebTitle: 'Description',
    },
  },
};
export default schemas;
