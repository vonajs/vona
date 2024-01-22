const atomAction_base = require('./bean.atomAction/bean.atomAction_base.js');
const atomAction_flow = require('./bean.atomAction/bean.atomAction_flow.js');

module.exports = module.meta.util.mixinClasses(atomAction_base, [
  atomAction_flow, //
]);
