import { Constructable } from '../../lib/decorator/type/constructable.js';
import { VonaApplication } from '../application/app.js';
import { IModuleMain, IMonkeyModule, IMonkeySystem } from './monkey.js';

export * from '@cabloy/module-info';

export type TypeModuleResourceLocales = Record<string, object>;
export type TypeModuleResourceLocaleModules = Record<string, TypeModuleResourceLocales>;
export type TypeModuleResourceErrors = Record<number, string>;
export type TypeModuleResourceErrorModules = Record<string, TypeModuleResourceErrors>;

export interface IModuleResource {
  Main: new () => IModuleMain;
  Monkey: new () => IMonkeyModule & IMonkeySystem;
  locales: TypeModuleResourceLocales;
  Errors: TypeModuleResourceErrors;
  config: (app: VonaApplication) => object | Promise<object>;
  constants: unknown;
  controllers: Constructable[];
}

declare module '@cabloy/module-info' {
  export interface IModule {
    resource: IModuleResource;
    mainInstance: IModuleMain;
    monkeyInstance: IMonkeyModule & IMonkeySystem;
  }
}
