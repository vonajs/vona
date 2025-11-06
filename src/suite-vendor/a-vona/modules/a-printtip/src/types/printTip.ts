export interface IMetaPrintTipInfo {
  title: string;
  path: string;
}

export interface IMetaPrintTipInfoInner extends IMetaPrintTipInfo {
  module: string;
}

export type TypeMetaPrintTipResult = IMetaPrintTipInfo | IMetaPrintTipInfo[] | undefined;

export interface IMetaPrintTipExecute {
  execute: () => Promise<TypeMetaPrintTipResult>;
}

declare module 'vona-module-a-meta' {
  export interface IMetaNameRecord {
    printTip: never;
  }
}
