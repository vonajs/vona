export default {
  info: {
    bean: 'partyExpense',
    title: 'PartyExpense',
    model: 'partyExpense',
    tableName: 'testPartyExpense',
    itemOnly: true,
    detail: {
      inline: true,
      atomClassMain: {
        module: 'test-party',
        atomClassName: 'party',
      },
    },
    enableRight: false,
    fields: {
      mappings: {
        atomIdMain: 'atomIdMain',
        lineNo: 'detailLineNo',
        atomName: 'name',
      },
    },
    layout: {
      config: {
        atomList: 'layoutAtomListPartyExpense',
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
    partyExpenseOtherTest2: {
      code: 101,
      title: 'OtherTest2',
      actionModule: 'a-base',
      actionComponent: 'action',
      icon: { f7: '::dot' },
      rightInherit: 'partyOver',
      mode: 'edit',
      directShowOnList: false,
      directShowOnItem: false,
      params: {
        transaction: true, // default is true
        dialog: {
          title: null,
          confirm: true, // default is true
          confirmText: null,
          toast: true, // default is true
          toastText: null,
        },
        form: {
          mode: 'edit', // edit/view
          fieldsRight: {
            mode: 'allowSpecificFields',
            basic: { read: false, write: false },
            fields: [
              { name: 'price', read: true, write: true },
              { name: 'quantity', read: true, write: true },
              { name: 'amount', read: true, write: true },
            ],
          },
        },
        actionAfter: {
          sameAs: 'write',
          commands: null, //
        },
      },
    },
    partyExpenseOtherTest3: {
      code: 102,
      title: 'OtherTest3',
      actionModule: 'a-base',
      actionComponent: 'action',
      icon: { f7: '::dot' },
      rightInherit: 'partyOver',
      mode: 'edit',
      directShowOnList: false,
      directShowOnItem: false,
      enableOnFormAction: 'partyExpenseOtherTest2',
    },
  },
  validator: 'partyExpense',
};
