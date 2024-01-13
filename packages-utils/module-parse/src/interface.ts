export interface IModuleParseInfo {
  pid: string;
  name: string;
  fullName: string;
  relativeName: string;
  url?: string;
  sync?: boolean;
  monkey?: boolean;
  vendor?: boolean;
  public?: boolean;
  node_modules?: boolean;
}
