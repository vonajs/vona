import type { IModuleInfo, TypeProjectEntityType, TypeProjectMode } from './interface.ts';
export declare function parseInfoFromPath(pathName?: string | null): IModuleInfo | undefined;
export declare function parseInfo(moduleName: string | undefined): IModuleInfo | undefined;
export declare function parseInfoPro(moduleName: string | undefined, projectMode: TypeProjectMode, projectEntityType: TypeProjectEntityType): IModuleInfo | undefined;
export declare function parseName(moduleUrl: any): string | undefined;
export declare function relativeNameToCapitalize(moduleName: string, firstCharToUpperCase: boolean): string;
