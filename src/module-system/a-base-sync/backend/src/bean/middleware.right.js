const right_0 = require('./middleware.right/middleware.right_0.js');
const right_atom = require('./middleware.right/middleware.right_atom.js');
const right_atomClass = require('./middleware.right/middleware.right_atomClass.js');
const right_resource = require('./middleware.right/middleware.right_resource.js');

// request.body
//   key: atomId itemId
//   atomClass: id,module,atomClassName
//   item:
// options
//   type: atom/resource
//   action(atom):
//   name(function):
//   module:
module.exports = module.meta.util.mixinClasses(right_0, [
  //
  right_atom,
  right_atomClass,
  right_resource,
]);
