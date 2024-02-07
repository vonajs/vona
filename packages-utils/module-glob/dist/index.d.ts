import { IModuleGlobOptions } from './interface.js';
import { IModule, ISuite } from '@cabloy/module-info';
export * from './interface.js';
export declare function glob(options: IModuleGlobOptions): Promise<{
    suites: Record<string, ISuite>;
    modules: Record<string, IModule>;
    modulesArray: IModule[];
    modulesLocal: Record<string, IModule>;
    modulesGlobal: Record<string, IModule>;
    modulesMonkey: Record<string, IModule>;
    suitesLocal: Record<string, ISuite>;
    suitesVendor: Record<string, ISuite>;
}>;
//# sourceMappingURL=index.d.ts.map