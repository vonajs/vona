import { IModuleResource, ISuiteResource } from '@cabloy/module-info';

export interface IModuleGlobOptions {
  projectPath: string;
  disabledModules?: string[];
  disabledSuites?: string[];
  log?: boolean;
  type: 'front' | 'backend';
  loadPackage?: boolean;
}

export interface IModuleGlobContext {
  options: IModuleGlobOptions;
  suites: Record<string, ISuiteResource>;
  modules: Record<string, IModuleResource>;
  modulesArray: IModuleResource[];
  modulesLast: IModuleResource[];
  //
  modulesLocal: Record<string, IModuleResource>;
  modulesGlobal: Record<string, IModuleResource>;
  modulesMonkey: Record<string, IModuleResource>;
  //
  suitesLocal: Record<string, ISuiteResource>;
  suitesVendor: Record<string, ISuiteResource>;
  //
  disabledModules: Record<string, boolean>;
  disabledSuites: Record<string, boolean>;
}
