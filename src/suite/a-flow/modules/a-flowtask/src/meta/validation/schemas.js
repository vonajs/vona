const startEventAtom = require('./schema/startEventAtom.js');
const endEventAtom = require('./schema/endEventAtom.js');
const activityUserTask = require('./schema/activityUserTask.js');

const schemas = {};
// startEventAtom
Object.assign(schemas, startEventAtom);
// endEventAtom
Object.assign(schemas, endEventAtom);
// activityUserTask
Object.assign(schemas, activityUserTask);
// ok
module.exports = schemas;
