import { IModuleGlobOptions } from './interface.js';
import { IModule, ISuite } from '@cabloy/module-info';
export * from './interface.js';
export declare function glob(options: IModuleGlobOptions): Promise<{
    suites: Record<string, ISuite>;
    modules: Record<string, IModule>;
    modulesArray: IModule[];
}>;
//# sourceMappingURL=index.d.ts.map