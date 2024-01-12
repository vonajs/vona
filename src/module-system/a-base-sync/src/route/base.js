module.exports = [
  // base
  { method: 'post', path: 'base/modules', controller: 'base' },
  { method: 'post', path: 'base/locales', controller: 'base' },
  { method: 'post', path: 'base/resourceTypes', controller: 'base' },
  { method: 'post', path: 'base/getAtomClassBase', controller: 'base' },
  { method: 'post', path: 'base/getActionsBase', controller: 'base' },
  { method: 'post', path: 'base/atomClasses', controller: 'base' },
  { method: 'post', path: 'base/actions', controller: 'base' },
  { method: 'get', path: 'base/qrcode', controller: 'base', meta: { auth: { enable: false } } },
  { method: 'post', path: 'base/themes', controller: 'base' },
];
