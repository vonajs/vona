const content = {
  layouts: {
    list: {},
    table: {
      blocks: {
        items: {
          columns: [
            {
              dataIndex: 'detailLineNo',
              title: '#',
              align: 'center',
              width: 50,
              renderType: 'lineNo',
            },
            {
              dataIndex: 'detailName',
              title: 'Name',
              align: 'left',
              renderType: 'atomName',
            },
            {
              dataIndex: 'price',
              title: 'Price',
              align: 'left',
              params: {
                currency: true,
              },
            },
          ],
        },
      },
    },
  },
};
const layout = {
  atomName: 'Purchase Order Details',
  atomStaticKey: 'layoutAtomListPurchaseOrderDetail',
  atomRevision: 11,
  description: '',
  layoutTypeCode: 5,
  content: JSON.stringify(content),
  resourceRoles: 'root',
};
export default layout;
