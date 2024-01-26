import user from './schema/user.js';
import userAdmin from './schema/userAdmin.js';
import userChangeUserName from './schema/userChangeUserName.js';
import category from './schema/category.js';
import resource from './schema/resource.js';
import role from './schema/role.js';

const schemas = {};
Object.assign(schemas, user);
Object.assign(schemas, userAdmin);
Object.assign(schemas, userChangeUserName);
Object.assign(schemas, category);
Object.assign(schemas, resource);
Object.assign(schemas, role);
export default schemas;
