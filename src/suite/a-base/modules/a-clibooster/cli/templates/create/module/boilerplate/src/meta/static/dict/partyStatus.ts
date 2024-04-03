const dictItems = [
  {
    code: 0,
    title: 'Ongoing',
  },
  {
    code: 1,
    title: 'Over',
  },
];
const dictLocales = {
  'zh-cn': {
    Ongoing: '进行中',
    Over: '已结束',
  },
};
const dict = {
  atomName: 'Party Status',
  atomStaticKey: 'dictPartyStatus',
  atomRevision: 0,
  description: '',
  dictItems: JSON.stringify(dictItems),
  dictLocales: JSON.stringify(dictLocales),
  resourceRoles: 'root',
};
export default dict;
