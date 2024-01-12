const atomBase_0 = require('./bean.atomBase/bean.atomBase_0.js');
const atomBase_1 = require('./bean.atomBase/bean.atomBase_1.js');
const atomBase_create = require('./bean.atomBase/bean.atomBase_create.js');
const atomBase_default = require('./bean.atomBase/bean.atomBase_default.js');
const atomBase_select = require('./bean.atomBase/bean.atomBase_select.js');
const atomBase_read = require('./bean.atomBase/bean.atomBase_read.js');
const atomBase_write = require('./bean.atomBase/bean.atomBase_write.js');
const atomBase_delete = require('./bean.atomBase/bean.atomBase_delete.js');
const atomBase_exportBulk = require('./bean.atomBase/bean.atomBase_exportBulk.js');
const atomBase_performAction = require('./bean.atomBase/bean.atomBase_performAction.js');
const atomBase_performActionBulk = require('./bean.atomBase/bean.atomBase_performActionBulk.js');

module.exports = module.meta.util.mixinClasses(atomBase_0, [
  //
  atomBase_1,
  atomBase_create,
  atomBase_default,
  atomBase_select,
  atomBase_read,
  atomBase_write,
  atomBase_delete,
  atomBase_exportBulk,
  atomBase_performAction,
  atomBase_performActionBulk,
]);
