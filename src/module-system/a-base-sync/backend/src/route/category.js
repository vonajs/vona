module.exports = [
  // category
  { method: 'post', path: 'category/child', controller: 'category' }, // not set function right
  { method: 'post', path: 'category/children', controller: 'category' }, // not set function right
  {
    method: 'post',
    path: 'category/add',
    controller: 'category',
    meta: { right: { type: 'resource', module: 'a-settings', name: 'settings' } },
  },
  {
    method: 'post',
    path: 'category/delete',
    controller: 'category',
    meta: { right: { type: 'resource', module: 'a-settings', name: 'settings' } },
  },
  {
    method: 'post',
    path: 'category/move',
    controller: 'category',
    meta: { right: { type: 'resource', module: 'a-settings', name: 'settings' } },
  },
  {
    method: 'post',
    path: 'category/item',
    controller: 'category',
    meta: { right: { type: 'resource', module: 'a-settings', name: 'settings' } },
  },
  {
    method: 'post',
    path: 'category/save',
    controller: 'category',
    middlewares: 'validate',
    meta: {
      validate: { module: 'a-base', validator: 'category' },
      right: { type: 'resource', module: 'a-settings', name: 'settings' },
    },
  },
  { method: 'post', path: 'category/tree', controller: 'category' }, // not set function right
  { method: 'post', path: 'category/relativeTop', controller: 'category' }, // not set function right
  { method: 'post', path: 'category/parseCategoryName', controller: 'category' }, // not set function right
];
