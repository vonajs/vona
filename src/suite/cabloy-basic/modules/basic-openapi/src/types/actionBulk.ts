import 'vona-module-a-openapi';
import type { IResourceActionBulkOptionsBase } from 'vona-module-a-openapi';

export interface IResourceActionBulkOptionsCreate extends IResourceActionBulkOptionsBase {}

declare module 'vona-module-a-openapi' {
  export interface IResourceActionBulkRecord {
    create?: IResourceActionBulkOptionsCreate;
  }

  export interface IResourceComponentActionBulkRecord {
    ActionCreate?: IResourceActionBulkOptionsCreate;
  }
}
