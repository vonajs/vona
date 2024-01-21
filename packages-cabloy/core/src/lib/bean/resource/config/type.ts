import { CabloyApplication } from '../../../../index.js';

export type TypeModuleConfig<T extends (app: CabloyApplication) => object> = ReturnType<T>;
