import 'vona-module-a-openapi';
import type {
  IResourceActionBulkOptionsBase,
  IResourceComponentActionBulkOptionsAction,
} from 'vona-module-a-openapi';

export interface IResourceActionBulkOptionsCreate extends IResourceActionBulkOptionsBase {}

export interface IResourceActionBulkOptionsOperationsBulk extends IResourceActionBulkOptionsBase {
  actions?: IResourceComponentActionBulkOptionsAction[];
}

declare module 'vona-module-a-openapi' {
  export interface IResourceActionBulkRecord {
    create?: IResourceActionBulkOptionsCreate;
    operationsBulk?: IResourceActionBulkOptionsOperationsBulk;
  }

  export interface IResourceComponentActionBulkRecord {
    ActionCreate?: IResourceActionBulkOptionsCreate;
    ActionOperationsBulk?: IResourceActionBulkOptionsOperationsBulk;
  }
}
