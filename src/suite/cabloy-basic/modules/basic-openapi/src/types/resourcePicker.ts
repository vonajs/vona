import type { IResourceRecord, ITableQuery } from 'vona-module-a-openapi';

import type { ISelectOptions } from './select.ts';

export interface IResourcePickerOptions {
  resource?: keyof IResourceRecord;
  actionPath?: string;
  query?: ITableQuery;
  selectOptions?: ISelectOptions;
  relation?: string;
}
