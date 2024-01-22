const atomRightAux_0 = require('./bean.atomRightAux/bean.atomRightAux_0.js');
const atomRightAux_roleScopesOfUser = require('./bean.atomRightAux/bean.atomRightAux_roleScopesOfUser.js');
const atomRightAux_roleScopesOfRole = require('./bean.atomRightAux/bean.atomRightAux_roleScopesOfRole.js');
const atomRightAux_roleScopesMineOfUser = require('./bean.atomRightAux/bean.atomRightAux_roleScopesMineOfUser.js');
const atomRightAux_roleWhos = require('./bean.atomRightAux/bean.atomRightAux_roleWhos.js');
const atomRightAux_roleParentsOfUser = require('./bean.atomRightAux/bean.atomRightAux_roleParentsOfUser.js');
const atomRightAux_utils = require('./bean.atomRightAux/bean.atomRightAux_utils.js');

module.exports = module.meta.util.mixinClasses(atomRightAux_0, [
  //
  atomRightAux_roleScopesOfUser,
  atomRightAux_roleScopesOfRole,
  atomRightAux_roleScopesMineOfUser,
  atomRightAux_roleWhos,
  atomRightAux_roleParentsOfUser,
  atomRightAux_utils,
]);
