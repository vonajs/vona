export default {
  info: {
    bean: 'party',
    title: 'Party',
    tableName: 'testParty',
    tableNameModes: {},
    language: false,
    category: false,
    tag: false,
    cms: true,
    history: true,
    fields: {
      mappings: {
        userIds: 'partyOverPerson',
      },
      dicts: {
        atomState: {
          formal: {
            dictKey: 'test-party:dictPartyStatus',
          },
        },
        partyTypeCode: {
          dictKey: 'test-party:dictPartyType',
        },
        partyCountry: {
          dictKey: 'a-dictarea:countries',
        },
        partyCity: {
          dictKeyFrom: 'partyCountry',
          separator: '/',
        },
      },
    },
    layout: {
      config: {
        atomList: 'layoutAtomListParty',
        atomItem: 'layoutAtomItemParty',
      },
    },
  },
  actions: {
    create: {
      createDelay: true,
    },
    write: {
      // enableOnAtomState: [null, 0],
      enableOnAtomStateReverse: '1',
    },
    partyOver: {
      code: 101,
      title: 'PartyOver',
      // actionModule: __ThisModule__,
      actionModule: 'a-base',
      actionComponent: 'action',
      icon: { f7: ':outline:check-circle-outline' },
      enableOnAtomState: '0',
      enableOnOpened: false,
      directShowOnList: true,
      directShowOnItem: true,
      stage: 'formal',
      params: {
        transaction: true, // default is true
        atomState: 1, // over
        fieldsMapping: {
          partyOverPerson: 'user.id',
          partyOverTime: 'new Date()',
        },
        cms: {
          render: true,
        },
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
              { name: '__groupPartyOverInfo', read: true, write: false },
              // { name: 'partyOver', read: true, write: true },
              { name: 'partySummary', read: true, write: true },
              { name: '__groupPartyExpenseInfo', read: true, write: false },
              { name: 'partyExpenseCount', read: true, write: true },
              { name: 'partyExpenseAmount', read: true, write: true },
              { name: '__groupPartyExpenseDetailsInfo', read: true, write: false },
              { name: 'partyExpenseDetails', read: true, write: true },
            ],
            details: {
              'test-party:partyExpense': {
                mode: 'allowAllFieldsReadWrite',
              },
            },
          },
        },
        actionAfter: {
          sameAs: 'save',
          commands: null, //
        },
      },
    },
    partyOverOtherTest1: {
      code: 102,
      title: 'OtherTest1',
      actionModule: 'a-base',
      actionComponent: 'action',
      icon: { f7: '::dot' },
      enableOnOpened: false,
      directShowOnList: false,
      directShowOnItem: false,
      stage: 'formal',
      enableOnFormAction: 'partyOver',
    },
    partyOverBulk: {
      code: 201,
      title: 'PartyOver',
      // actionModule: __ThisModule__,
      actionModule: 'a-base',
      actionComponent: 'actionBulk',
      icon: { f7: ':outline:check-circle-outline' },
      bulk: true,
      select: true,
      stage: 'formal',
      params: {
        transaction: true, // default is true
        performAction: {
          policy: 'loop',
          actionItem: 'partyOver',
        },
        dialog: {
          confirm: true, // default is true
          confirmText: null,
          toast: true, // default is true
          toastTextDoneAll: null,
          toastTextDoneSome: null,
        },
        form: {
          fieldsRight: {
            mode: 'custom',
            custom: {
              module: 'test-party',
              validator: 'partyOverBulk',
            },
          },
        },
        actionAfter: {
          sameAs: 'refresh',
        },
        actionAfterItem: {
          // sameAs: 'save',
        },
      },
    },
  },
  validator: 'party',
  search: {
    validator: 'partySearch',
  },
};
