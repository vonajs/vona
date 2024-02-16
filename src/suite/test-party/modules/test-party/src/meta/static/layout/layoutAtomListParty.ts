const content = {
  info: {
    orders: [
      { name: 'partyTypeCode', title: 'Party Type' },
      { name: 'personCount', title: 'Person Count', by: 'asc' },
    ],
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
              renderType: 'atomName',
            },
            {
              dataIndex: 'partyTypeCode',
              title: 'Party Type',
              align: 'left',
              renderType: 'dict',
            },
            {
              dataIndex: 'partyTime',
              title: 'Party Time',
              align: 'center',
              params: {
                dateFormat: {
                  lines: true,
                },
              },
            },
            {
              dataIndex: '_partyCityTitleLocale',
              title: 'Party City',
              align: 'left',
            },
            {
              dataIndex: 'personCount',
              title: 'Person Count',
              align: 'left',
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
  atomName: 'Party',
  atomStaticKey: 'layoutAtomListParty',
  atomRevision: 5,
  description: '',
  layoutTypeCode: 3,
  content: JSON.stringify(content),
  resourceRoles: 'root',
};
export default layout;
