const user = require('./schema/user.js');
const userAdmin = require('./schema/userAdmin.js');
const userChangeUserName = require('./schema/userChangeUserName.js');
const category = require('./schema/category.js');
const resource = require('./schema/resource.js');
const role = require('./schema/role.js');

const schemas = {};
Object.assign(schemas, user);
Object.assign(schemas, userAdmin);
Object.assign(schemas, userChangeUserName);
Object.assign(schemas, category);
Object.assign(schemas, resource);
Object.assign(schemas, role);
module.exports = schemas;
