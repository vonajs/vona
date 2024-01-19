import { IModuleMain, IMonkeyModule } from './monkey.js';

export * from '@cabloy/module-info';

// todo:
export interface IModuleResource {
  Main: new () => IModuleMain;
  Monkey: new () => IMonkeyModule;
  beans: Record<string, any>;
  aops: Record<string, any>;
  locales: Record<string, any>;
  errors: Record<number, string>;
}

declare module '@cabloy/module-info' {
  export interface IModule {
    resource: IModuleResource;
    main: IModuleMain;
    monkey: IMonkeyModule;
  }
}
