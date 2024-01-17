export { VersionManager } from './bean/version.manager.js';
export { LocalA, LocalB } from './bean/local.a.js';
export { LocalVersion } from './bean/local.version.js';
// const startupWorkerAlive = require('./bean/startup.workerAlive.js');
export { StartupDatabaseInit } from './bean/startup.databaseInit.js';
export { StartupDatabaseName } from './bean/startup.databaseName.js';
// const startupInstanceInit = require('./bean/startup.instanceInit.js');
export { BroadcastColumnsClear } from './bean/broadcast.columnsClear.js';
export { BeanWorker } from './bean/bean.worker.js';

// module.exports = {
//   // version
//   'version.manager': {
//     bean: versionManager,
//   },
//   // local
//   'local.version': {
//     bean: localVersion,
//   },
//   // startup
//   'startup.workerAlive': {
//     bean: startupWorkerAlive,
//   },
//   'startup.databaseInit': {
//     bean: startupDatabaseInit,
//   },
//   'startup.databaseName': {
//     bean: startupDatabaseName,
//   },
//   'startup.instanceInit': {
//     bean: startupInstanceInit,
//   },
//   // broadcast
//   'broadcast.columnsClear': {
//     bean: broadcastColumnsClear,
//   },
//   // global
//   worker: {
//     bean: beanWorker,
//     global: true,
//   },
// };
