export interface IModuleGlobOptions {
  projectPath: string;
  disabledModules?: string[];
  disabledSuites?: string[];
  log?: boolean;
  type: 'front' | 'backend';
}

export interface IModuleGlobContext {
  options: IModuleGlobOptions;
  suites: Record<string, ISuite>;
  modules: Record<string, IModule>;
  modulesArray: IModule[];
  modulesLast: IModule[];
  //
  modulesLocal: Record<string, IModule>;
  modulesGlobal: Record<string, IModule>;
  modulesMonkey: Record<string, IModule>;
  //
  suitesLocal: Record<string, ISuite>;
  suitesVendor: Record<string, ISuite>;
  //
  disabledModules: Record<string, boolean>;
  disabledSuites: Record<string, boolean>;
}
