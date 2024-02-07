import { IModule, ISuite } from '@cabloy/module-info';
export interface IModuleGlobOptions {
    projectPath: string;
    disabledModules?: string[];
    disabledSuites?: string[];
    log?: boolean;
    type: 'front' | 'backend';
    loadPackage?: boolean;
}
export interface IModuleGlobContext {
    options: IModuleGlobOptions;
    suites: Record<string, ISuite>;
    modules: Record<string, IModule>;
    modulesArray: IModule[];
    modulesLast: IModule[];
    modulesLocal: Record<string, IModule>;
    modulesGlobal: Record<string, IModule>;
    modulesMonkey: Record<string, IModule>;
    suitesLocal: Record<string, ISuite>;
    suitesVendor: Record<string, ISuite>;
    disabledModules: Record<string, boolean>;
    disabledSuites: Record<string, boolean>;
}
//# sourceMappingURL=interface.d.ts.map