const atom = require('./controller/atom.js');
const atomAction = require('./controller/atomAction.js');
const atomClass = require('./controller/atomClass.js');
const atomState = require('./controller/atomState.js');
const auth = require('./controller/auth.js');
const base = require('./controller/base.js');
const comment = require('./controller/comment.js');
const resource = require('./controller/resource.js');
const jwt = require('./controller/jwt.js');
const layoutConfig = require('./controller/layoutConfig.js');
const user = require('./controller/user.js');
const category = require('./controller/category.js');
const tag = require('./controller/tag.js');
const util = require('./controller/util.js');
const db = require('./controller/db.js');

const controllers = {
  atom,
  atomAction,
  atomClass,
  atomState,
  auth,
  base,
  comment,
  resource,
  jwt,
  layoutConfig,
  user,
  category,
  tag,
  util,
  db,
};
module.exports = controllers;
