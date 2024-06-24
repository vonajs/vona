export type TypeProjectMode = 'front' | 'api' | 'zova';
export type TypeProjectEntityType = 'module' | 'suite';
export interface IModuleInfo {
    pid: string;
    name: string;
    fullName: string;
    relativeName: string;
    url: string;
    sync?: boolean;
    monkey?: boolean;
    icon?: boolean;
    vendor?: boolean;
    node_modules?: boolean;
    originalName: string;
}
export interface ISuiteModuleBase {
    name: string;
    info: IModuleInfo;
    root: string;
    pkg: string;
    package: IModulePackage;
}
export interface ISuite extends ISuiteModuleBase {
    modules: string[];
}
export interface IModule extends ISuiteModuleBase {
    suite?: string;
}
export interface IBundleVendor {
    match: Array<string | RegExp>;
    output: string;
}
export interface IModulePackage {
    name: string;
    version: string;
    cabloyModule: {
        capabilities: {
            monkey: boolean;
            sync: boolean;
            icon: boolean;
        };
        fileVersion: number;
        dependencies: Record<string, string>;
        theme: object;
        icon: string;
        locale: string;
    };
    zovaModule: {
        capabilities: {
            monkey: boolean;
            sync: boolean;
            icon: boolean;
            theme: boolean;
            locale: boolean;
        };
        dependencies: Record<string, string>;
        bundle: {
            vendors: Array<IBundleVendor>;
        };
    };
    title: string;
    description: string;
    author: string;
    dependencies: string;
}
//# sourceMappingURL=interface.d.ts.map