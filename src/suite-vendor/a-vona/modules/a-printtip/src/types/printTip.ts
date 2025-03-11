export interface IMetaPrintTipInfo {
  title: string;
  path: string;
}

export type TypeMetaPrintTipResult = IMetaPrintTipInfo | IMetaPrintTipInfo[] | undefined;

export interface IMetaPrintTipExecute {
  execute: () => Promise<TypeMetaPrintTipResult>;
}
