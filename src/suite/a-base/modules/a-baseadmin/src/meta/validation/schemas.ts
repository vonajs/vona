import roleRight from './schema/roleRight.js';
import roleResourceRight from './schema/roleResourceRight.js';
import roleFieldsRight from './schema/roleFieldsRight.js';

const schemas = {};
Object.assign(schemas, roleRight);
Object.assign(schemas, roleResourceRight);
Object.assign(schemas, roleFieldsRight);
export default schemas;
