// todo:
export interface IAppModuleMain {
  beans: Record<string, any>;
  aops: Record<string, any>;
}

declare module '@cabloy/module-glob' {
  export interface IModule {
    main: IAppModuleMain;
  }
}
