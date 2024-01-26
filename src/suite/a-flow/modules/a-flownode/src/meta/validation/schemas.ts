import sequence from './schema/sequence.js';
import startEventTimer from './schema/startEventTimer.js';
import activityService from './schema/activityService.js';

const schemas = {};
// sequence
Object.assign(schemas, sequence);
// startEventTimer
Object.assign(schemas, startEventTimer);
// activityService
Object.assign(schemas, activityService);
// ok
export default schemas;
