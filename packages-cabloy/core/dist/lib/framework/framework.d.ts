import egg from 'egg';
export { Bootstrap } from './bootstrap.js';
export { CustomAppWorkerLoader as AppWorkerLoader, CustomAgentWorkerLoader as AgentWorkerLoader } from './loader.js';
declare const EGG_PATH: unique symbol;
export declare class Application extends egg.Application {
    get [EGG_PATH](): string;
}
export declare class Agent extends egg.Agent {
    get [EGG_PATH](): string;
}
//# sourceMappingURL=framework.d.ts.map