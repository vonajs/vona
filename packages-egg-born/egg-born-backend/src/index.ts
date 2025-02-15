import path from 'node:path';
import egg from 'egg';
import * as Framework from 'vona';

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
