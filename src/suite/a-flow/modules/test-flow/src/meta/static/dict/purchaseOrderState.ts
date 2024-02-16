const dictItems = [
  // {
  //   code: 1,
  //   title: 'Drafting',
  // },
  {
    code: 2,
    title: 'Reviewing',
  },
  {
    code: 3,
    title: 'Paying',
  },
  {
    code: 4,
    title: 'Receiving',
  },
  {
    code: -1,
    title: 'Ended',
  },
  // {
  //   code: -3,
  //   title: 'Cancelled',
  // },
];
const dictLocales = {
  'zh-cn': {
    // Drafting: '起草中',
    Reviewing: '审核中',
    Paying: '付款中',
    Receiving: '收货中',
    Ended: '已结束',
    // Cancelled: '已取消',
  },
};
const dict = {
  atomName: 'PurchaseOrderState',
  atomStaticKey: 'dictPurchaseOrderState',
  atomRevision: 4,
  description: '',
  dictItems: JSON.stringify(dictItems),
  dictLocales: JSON.stringify(dictLocales),
  resourceRoles: 'root',
};
export default dict;
