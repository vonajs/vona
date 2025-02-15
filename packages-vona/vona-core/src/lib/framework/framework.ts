// import path from 'path';
import egg from 'egg';

export { Bootstrap } from './bootstrap.js';

export { CustomAgentWorkerLoader as AgentWorkerLoader, CustomAppWorkerLoader as AppWorkerLoader } from './loader.js';

// const EGG_PATH = Symbol.for('egg#eggPath');

// const eggPath = path.resolve(__dirname, '../..');

export class Application extends egg.Application {
  // get [EGG_PATH]() {
  // return eggPath;
  // }

  dumpConfig() {
    // do nothing
  }

  dumpTiming() {
    // do nothing
  }
}

export class Agent extends egg.Agent {
  // get [EGG_PATH]() {
  //   return eggPath;
  // }

  dumpConfig() {
    // do nothing
  }

  dumpTiming() {
    // do nothing
  }
}
