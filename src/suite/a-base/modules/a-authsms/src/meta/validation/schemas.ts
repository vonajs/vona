import auth from './schema/auth.js';
import aliyun from './schema/aliyun.js';

const schemas = {};
Object.assign(schemas, auth, aliyun);
export default schemas;
