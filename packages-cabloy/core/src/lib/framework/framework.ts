import path from 'path';
import egg from 'egg';

export { CustomAppWorkerLoader as AppWorkerLoader } from './load/app.js';
export { CustomAgentWorkerLoader as AgentWorkerLoader } from './load/agent.js';

const EGG_PATH = Symbol.for('egg#eggPath');
const EGG_LOADER = Symbol.for('egg#loader');

const eggPath = path.resolve(__dirname, '../..');

export class Application extends egg.Application {
  get [EGG_PATH]() {
    return eggPath;
  }
}

export class Agent extends egg.Agent {
  get [EGG_PATH]() {
    return eggPath;
  }
}
