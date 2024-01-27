import startEventAtom from './schema/startEventAtom.js';
import endEventAtom from './schema/endEventAtom.js';
import activityUserTask from './schema/activityUserTask.js';

const schemas: any = {};
// startEventAtom
Object.assign(schemas, startEventAtom);
// endEventAtom
Object.assign(schemas, endEventAtom);
// activityUserTask
Object.assign(schemas, activityUserTask);
// ok
export default schemas;
