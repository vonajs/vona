import path from 'path';
import egg from 'egg';

export { CustomAppWorkerLoader as AppWorkerLoader, CustomAgentWorkerLoader as AgentWorkerLoader } from './loader.js';

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
