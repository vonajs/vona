import citiesUSA from './cities/citiesUSA.json';

const dictItems = citiesUSA;
const dictLocales: any = {};
const dict = {
  atomName: 'Cities USA',
  atomStaticKey: 'citiesUSA',
  atomRevision: 1,
  description: '',
  dictMode: 1, // tree
  dictItems: JSON.stringify(dictItems),
  dictLocales: JSON.stringify(dictLocales),
  resourceRoles: 'root',
};
export default dict;
