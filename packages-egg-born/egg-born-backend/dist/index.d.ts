import egg from 'egg';
import * as Framework from '@cabloy/core';
declare const EGG_PATH: unique symbol;
declare const EGG_LOADER: unique symbol;
declare class Application extends Framework.Application {
    get [EGG_PATH](): string;
    get [EGG_LOADER](): {
        new (): {
            [x: string]: any;
            pkgCabloy: any;
            loadConfig(): void;
            getAppname(): any;
        };
        [x: string]: any;
    };
}
declare class Agent extends Framework.Agent {
    get [EGG_PATH](): string;
    get [EGG_LOADER](): {
        new (): {
            [x: string]: any;
            pkgCabloy: any;
            loadConfig(): void;
            getAppname(): any;
        };
        [x: string]: any;
    };
}
declare const _default: typeof egg & {
    Application: typeof Application;
    Agent: typeof Agent;
    AppWorkerLoader: {
        new (): {
            [x: string]: any;
            pkgCabloy: any;
            loadConfig(): void;
            getAppname(): any;
        };
        [x: string]: any;
    };
    AgentWorkerLoader: {
        new (): {
            [x: string]: any;
            pkgCabloy: any;
            loadConfig(): void;
            getAppname(): any;
        };
        [x: string]: any;
    };
};
export = _default;
//# sourceMappingURL=index.d.ts.map