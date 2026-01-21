import type { TypeTableCellRenderComponentProvider } from './rest.ts';

export interface ITableProviderComponents {
  actionView?: TypeTableCellRenderComponentProvider;
  currency?: TypeTableCellRenderComponentProvider;
}

export interface ITableProvider {
  components?: ITableProviderComponents;
}
