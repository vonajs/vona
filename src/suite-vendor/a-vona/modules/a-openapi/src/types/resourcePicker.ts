import type { IResourceRecord } from './resource.ts';
import type { ISelectOptions } from './select.ts';
import type { ITableQuery } from './table.ts';

export interface IResourcePickerOptions {
  resource: keyof IResourceRecord;
  query?: ITableQuery;
  selectOptions?: ISelectOptions;
}
