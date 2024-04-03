const dictItems = [
  {
    code: 1,
    name: 'birthday',
    title: 'Birthday',
    options: {
      emoji: '🎂',
      icon: { f7: 'test-party::birthday' },
    },
  },
  {
    code: 2,
    name: 'dance',
    title: 'Dance',
    options: {
      emoji: '💃',
      icon: { f7: 'test-party::dance' },
    },
  },
  {
    code: 3,
    name: 'garden',
    title: 'Garden',
    options: {
      emoji: '🏡',
      icon: { f7: 'test-party::garden' },
    },
  },
];
const dictLocales = {
  'zh-cn': {
    Birthday: '生日',
    Dance: '跳舞',
    Garden: '花园',
  },
};
const dict = {
  atomName: 'Party Type',
  atomStaticKey: 'dictPartyType',
  atomRevision: 1,
  description: '',
  dictItems: JSON.stringify(dictItems),
  dictLocales: JSON.stringify(dictLocales),
  resourceRoles: 'root',
};
export default dict;
