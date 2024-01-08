module.exports = [
  // db
  { method: 'post', path: 'db/insert', controller: 'db', middlewares: 'test' },
  { method: 'post', path: 'db/select', controller: 'db', middlewares: 'test' },
  { method: 'post', path: 'db/get', controller: 'db', middlewares: 'test' },
  { method: 'post', path: 'db/count', controller: 'db', middlewares: 'test' },
  { method: 'post', path: 'db/update', controller: 'db', middlewares: 'test' },
  { method: 'post', path: 'db/delete', controller: 'db', middlewares: 'test' },
  { method: 'post', path: 'db/query', controller: 'db', middlewares: 'test' },
  { method: 'post', path: 'db/queryOne', controller: 'db', middlewares: 'test' },
  { method: 'post', path: 'db/iid', controller: 'db', middlewares: 'test' },
];
