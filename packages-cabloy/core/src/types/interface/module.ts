import { IModuleRoute } from '../../lib/bean/resource/route/type.js';
import { CabloyApplication } from '../application/app.js';
import { IModuleMain, IModuleMainContext, IMonkeyModule } from './monkey.js';

export * from '@cabloy/module-info';

// todo:
export interface IModuleResource {
  Main: new () => IModuleMain;
  Monkey: new () => IMonkeyModule;
  locales: Record<string, any>;
  Errors: Record<number, string>;
  config: (app: CabloyApplication) => object;
  meta: ((app: CabloyApplication) => IModuleMeta) | IModuleMeta;
  constants: unknown;
  routes: IModuleRoute[];
}

export type TypeModuleMetaGeneric = {
  [property: string]: any;
};

export interface IModuleMeta extends TypeModuleMetaGeneric {}

declare module '@cabloy/module-info' {
  export interface IModule {
    resource: IModuleResource;
    meta: IModuleMeta;
    mainInstance: IModuleMain & IModuleMainContext;
    monkeyInstance: IMonkeyModule;
  }
}
