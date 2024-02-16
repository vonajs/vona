const content = {
  info: {
    orders: [],
  },
  layouts: {
    list: {
      blocks: {
        // title: false,
      },
    },
    table: {
      blocks: {
        items: {
          columns: [
            {
              dataIndex: 'atomName',
              title: 'Atom Name',
              align: 'left',
              width: 250,
              renderType: 'atomName',
            },
            {
              dataIndex: 'payMoneyPerson',
              title: 'PayMoneyPerson',
              align: 'left',
              renderType: 'userName',
            },
            {
              dataIndex: 'payMoneyTime',
              title: 'PayMoneyTime',
              align: 'center',
              params: {
                dateFormat: {
                  lines: true,
                },
              },
            },
            {
              dataIndex: 'receiveGoodsPerson',
              title: 'ReceiveGoodsPerson',
              align: 'left',
              renderType: 'userName',
            },
            {
              dataIndex: 'receiveGoodsTime',
              title: 'ReceiveGoodsTime',
              align: 'center',
              params: {
                dateFormat: {
                  lines: true,
                },
              },
            },
            {
              dataIndex: 'userIdCreated',
              title: 'Creator',
              align: 'left',
              renderType: 'userName',
            },
            {
              dataIndex: 'atomCreatedAt',
              title: 'Created Time',
              align: 'center',
              params: {
                dateFormat: {
                  lines: true,
                },
              },
            },
            {
              dataIndex: 'atomUpdatedAt',
              title: 'Modification Time',
              align: 'center',
              params: {
                dateFormat: {
                  lines: true,
                },
              },
            },
          ],
        },
      },
    },
  },
};
const layout = {
  atomName: 'Purchase Order',
  atomStaticKey: 'layoutAtomListPurchaseOrder',
  atomRevision: 7,
  description: '',
  layoutTypeCode: 3,
  content: JSON.stringify(content),
  resourceRoles: 'root',
};
export default layout;
