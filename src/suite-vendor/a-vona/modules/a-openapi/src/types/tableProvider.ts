import type { TypeTableCellRenderComponentProvider } from './rest.ts';

export interface ITableProviderComponents {
  ActionView?: TypeTableCellRenderComponentProvider;
  Currency?: TypeTableCellRenderComponentProvider;
}

export interface ITableProvider {
  components?: ITableProviderComponents;
}
