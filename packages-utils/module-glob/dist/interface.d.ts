import { IModule, ISuite, TypeProjectMode } from '@cabloy/module-info';
export interface IModuleGlobOptions {
    projectPath: string;
    disabledModules?: string[];
    disabledSuites?: string[];
    log?: boolean;
    projectMode: TypeProjectMode;
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
    pathsMeta: IModuleGlobPathsMeta;
}
export interface IModuleGlobPathMetaItem {
    prefix: string;
    vendor: boolean;
    node_modules?: boolean;
}
export interface IModuleGlobPathsMeta {
    suites: IModuleGlobPathMetaItem[];
    modules: IModuleGlobPathMetaItem[];
}
//# sourceMappingURL=interface.d.ts.map