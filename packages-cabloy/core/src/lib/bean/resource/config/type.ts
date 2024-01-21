import { CabloyApplication } from '../../../../index.js';

export interface IModuleConfigMiddleware {}

export type TypeModuleConfig<T extends (app: CabloyApplication) => object> = ReturnType<T>;
