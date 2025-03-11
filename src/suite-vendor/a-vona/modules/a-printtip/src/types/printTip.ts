export interface IMetaPrintTipInfo {
  title: string;
  path: string;
}
export interface IMetaPrintTipExecute {
  execute: () => Promise<IMetaPrintTipInfo | IMetaPrintTipInfo[]>;
}
