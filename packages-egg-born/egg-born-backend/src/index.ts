import * as path from 'path';
import * as egg from 'egg';
import * as Framework from '@cabloy/core';
const EGG_PATH = Symbol.for('egg#eggPath');
const EGG_LOADER = Symbol.for('egg#loader');

const eggPath = path.resolve(__dirname, './');

// process.traceDeprecation = true;

class Application extends Framework.Application {
  get [EGG_PATH]() {
    return eggPath;
  }
  get [EGG_LOADER]() {
    return Framework.AppWorkerLoader;
  }
}

class Agent extends Framework.Agent {
  get [EGG_PATH]() {
    return eggPath;
  }
  get [EGG_LOADER]() {
    return Framework.AgentWorkerLoader;
  }
}

export = Object.assign(egg, {
  Application,
  Agent,
  AppWorkerLoader: Framework.AppWorkerLoader,
  AgentWorkerLoader: Framework.AppWorkerLoader,
});
