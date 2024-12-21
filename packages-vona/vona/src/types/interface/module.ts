import { Constructable } from '../../lib/decorator/type/constructable.js';
import { VonaApplication } from '../application/app.js';
import { IModuleMain, IMonkeyModule, IMonkeySystem } from './monkey.js';

export * from '@cabloy/module-info';

export type TypeModuleResourceLocales = Record<string, object>;
export type TypeModuleResourceLocaleModules = Record<string, TypeModuleResourceLocales>;
export type TypeModuleResourceErrors = Record<number, string>;
export type TypeModuleResourceErrorModules = Record<string, TypeModuleResourceErrors>;

// todo:
export interface IModuleResource {
  Main: new () => IModuleMain;
  Monkey: new () => IMonkeyModule & IMonkeySystem;
  locales: TypeModuleResourceLocales;
  Errors: TypeModuleResourceErrors;
  config: (app: VonaApplication) => object | Promise<object>;
  meta: ((app: VonaApplication) => IModuleMeta) | IModuleMeta;
  constants: unknown;
  controllers: Constructable[];
}

export type TypeModuleMetaGeneric = {
  [property: string]: any;
};

export interface IModuleMeta extends TypeModuleMetaGeneric {}

declare module '@cabloy/module-info' {
  export interface IModule {
    resource: IModuleResource;
    meta: IModuleMeta;
    mainInstance: IModuleMain;
    monkeyInstance: IMonkeyModule & IMonkeySystem;
  }
}
