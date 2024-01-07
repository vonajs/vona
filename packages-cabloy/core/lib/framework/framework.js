const path = require('path');
const egg = require('egg');
const EGG_PATH = Symbol.for('egg#eggPath');
const EGG_LOADER = Symbol.for('egg#loader');
const AppWorkerLoader = require('./load/app.js');
const AgentWorkerLoader = require('./load/agent.js');

///
require('@zhennann/set');
require('regenerator-runtime');
require('../base/json.js');

// process.traceDeprecation = true;

const moduleAlias = require('module-alias');
moduleAlias.addAlias('koa-static-cache', '@zhennann/koa-static-cache');

const Master = require('egg-cluster/lib/master.js');
Master.prototype.onReload = require('../utils/reload.js');
///

const eggPath = path.resolve(__dirname, '../..');

class Application extends egg.Application {
  get [EGG_PATH]() {
    return eggPath;
  }
}

class Agent extends egg.Agent {
  get [EGG_PATH]() {
    return eggPath;
  }
}

module.exports = {
  Application,
  Agent,
  AppWorkerLoader,
  AgentWorkerLoader,
};
