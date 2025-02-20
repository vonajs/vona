import type { VonaApplication } from '../../lib/core/application.ts';
import type { Constructable } from '../../lib/decorator/type/constructable.ts';
import type { IModuleMain, IMonkeyModule, IMonkeySystem } from './monkey.ts';

export type TypeModuleResourceLocales = Record<string, object>;
export type TypeModuleResourceLocaleModules = Record<string, TypeModuleResourceLocales>;
export type TypeModuleResourceErrors = Record<number, string>;
export type TypeModuleResourceErrorModules = Record<string, TypeModuleResourceErrors>;
export type TypeModuleResourceConfig = (app: VonaApplication) => object | Promise<object>;

export interface IModuleResource {
  Main: new () => IModuleMain;
  Monkey: new () => IMonkeyModule & IMonkeySystem;
  locales: TypeModuleResourceLocales;
  Errors: TypeModuleResourceErrors;
  config: TypeModuleResourceConfig;
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
