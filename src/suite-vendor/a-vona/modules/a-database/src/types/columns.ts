export interface ITableColumn {
  type: string;
  default: any;
}

export type ITableColumns = Record<string, ITableColumn>;
