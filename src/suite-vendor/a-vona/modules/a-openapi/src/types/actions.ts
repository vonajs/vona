import { TableIdentity } from 'table-identity';

import type { IResourceRecord } from './resource.ts';
import type { ISchemaObjectExtensionFieldRestScene } from './rest.ts';

export interface IResourceComponentFormFieldRecord {}

export interface IResourceActionBulkRecord {}

export interface IResourceActionRowRecord {}

export interface IResourceActionTableRecord
  extends IResourceActionBulkRecord, IResourceActionRowRecord {}

export type IResourceComponentActionBulkRecord = {
  [key in keyof IResourceActionBulkRecord as `Action${Capitalize<key>}`]: IResourceActionBulkRecord[key];
};

export type IResourceComponentActionRowRecord = {
  [key in keyof IResourceActionRowRecord as `Action${Capitalize<key>}`]: IResourceActionRowRecord[key];
};

export interface IResourceComponentActionTableRecord
  extends IResourceComponentActionBulkRecord, IResourceComponentActionRowRecord {}

export interface IPermissionHint {
  action?: string;
  public?: boolean;
}

export interface IResourceActionBulkOptionsBase {
  class?: any;
  resource?: keyof IResourceRecord;
  permission?: {
    action?: keyof IResourceActionBulkRecord;
    public?: boolean;
  };
}

export interface IResourceActionRowOptionsBase {
  class?: any;
  resource?: keyof IResourceRecord;
  id?: TableIdentity;
  permission?: {
    action?: keyof IResourceActionRowRecord;
    public?: boolean;
  };
}

export interface IResourceActionBulkOptionsCreate extends IResourceActionBulkOptionsBase {}

export interface IResourceActionRowOptionsView extends IResourceActionRowOptionsBase {}

export interface IResourceActionRowOptionsUpdate extends IResourceActionRowOptionsBase {}

export interface IResourceActionRowOptionsDelete extends IResourceActionRowOptionsBase {}

export interface IResourceActionRowOptionsSubmit extends IResourceActionRowOptionsBase {}
export interface IResourceActionRowOptionsBack extends IResourceActionRowOptionsBase {}

export interface IResourceActionBulkOptionsOperationsBulk extends IResourceActionBulkOptionsBase {
  actions?: IResourceActionBulkOptionsOperationsBulkAction[];
}

export interface IResourceActionRowOptionsOperationsRow extends IResourceActionRowOptionsBase {
  actions?: IResourceActionRowOptionsOperationsRowAction[];
}

export interface IResourceActionBulkOptionsOperationsBulkAction {
  name: keyof IResourceActionBulkRecord; // not omit operationsBulk
  options: ISchemaObjectExtensionFieldRestScene;
}

export interface IResourceActionRowOptionsOperationsRowAction {
  name: keyof IResourceActionRowRecord; // not omit operationsBulk
  options: ISchemaObjectExtensionFieldRestScene;
}
