import { IModuleInfo, TypeProjectEntityType, TypeProjectMode } from './interface.js';
export * from './interface.js';
export declare const ParseModuleNameLevelInit = 1;
export declare function parseModuleName(level?: number): string | undefined;
export declare function parseModuleInfo(level?: number): IModuleInfo | undefined;
export declare function parseInfoFromPath(pathName?: string | null): IModuleInfo | undefined;
export declare function parseInfo(moduleName: string | undefined): IModuleInfo | undefined;
export declare function parseInfoPro(moduleName: string | undefined, projectMode: TypeProjectMode, projectEntityType: TypeProjectEntityType): IModuleInfo | undefined;
export declare function parseName(moduleUrl: any): any;
//# sourceMappingURL=index.d.ts.map