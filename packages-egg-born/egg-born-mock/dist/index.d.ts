/// <reference types="node" />
import { CabloyApplication } from '@cabloy/core';
import Assert from 'assert';
import { IModuleInfo } from '@cabloy/module-info';
export declare const assert: typeof Assert;
export declare const app: CabloyApplication;
export declare const mock: import("egg-mock").EggMock;
export declare const mm: import("egg-mock").EggMock;
export declare function mockUrl(url: any, apiPrefix?: boolean): string;
export declare function mockInfo(): IModuleInfo;
//# sourceMappingURL=index.d.ts.map