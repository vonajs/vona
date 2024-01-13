export interface IModuleGlobOptions {
  projectPath: string;
  disabledModules?: string[];
  disabledSuites?: string[];
  log?: boolean;
  type: 'front' | 'backend';
}
