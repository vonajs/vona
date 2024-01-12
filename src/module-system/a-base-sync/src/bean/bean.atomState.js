const atomState_0 = require('./bean.atomState/bean.atomState_0.js');
const atomState_static = require('./bean.atomState/bean.atomState_static.js');
const atomState_dynamic = require('./bean.atomState/bean.atomState_dynamic.js');

module.exports = module.meta.util.mixinClasses(atomState_0, [
  //
  atomState_static,
  atomState_dynamic,
]);
