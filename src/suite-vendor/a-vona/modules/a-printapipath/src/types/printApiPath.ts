export interface IMetaPrintApiPathInfo {
  title: string;
  path: string;
}
export interface IMetaPrintApiPathExecute {
  execute: () => Promise<IMetaPrintApiPathInfo | IMetaPrintApiPathInfo[]>;
}
