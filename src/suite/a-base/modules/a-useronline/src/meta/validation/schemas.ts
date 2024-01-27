import userOnline from './schema/userOnline.js';
import userOnlineHistory from './schema/userOnlineHistory.js';

const schemas: any = {};
// userOnline
Object.assign(schemas, userOnline);
// userOnlineHistory
Object.assign(schemas, userOnlineHistory);
// ok
export default schemas;
