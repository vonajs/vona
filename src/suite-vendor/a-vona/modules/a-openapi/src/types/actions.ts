import type { types } from 'typestyle';

import { TableIdentity } from 'table-identity';

import type { TypeFormScene } from './formMeta.ts';
import type { IResourceRecord } from './resource.ts';
import type { TypeRenderComponentJsx } from './rest.ts';
import type { ZovaJsxComponentType } from './zovaJsx.ts';

export interface IResourceActionBulkRecord {}

export interface IResourceActionRowRecord {}

export interface IResourceActionTableRecord
  extends IResourceActionBulkRecord, IResourceActionRowRecord {}

export interface IResourceComponentActionBulkRecord {}

export interface IResourceComponentActionRowRecord {}

export interface IResourceComponentActionTableRecord
  extends IResourceComponentActionBulkRecord, IResourceComponentActionRowRecord {}

export interface IPermissionHint {
  action?: string;
  public?: boolean;
  formScene?: TypeFormScene | TypeFormScene[];
}

export interface IResourceActionBulkOptionsBase {
  class?: any;
  style?: types.NestedCSSProperties;
  resource?: keyof IResourceRecord;
  permission?: {
    action?: keyof IResourceActionBulkRecord;
    public?: boolean;
  };
}

export interface IResourceActionRowOptionsBase {
  class?: any;
  style?: types.NestedCSSProperties;
  resource?: keyof IResourceRecord;
  id?: TableIdentity;
  permission?: {
    action?: keyof IResourceActionRowRecord;
    public?: boolean;
    formScene?: TypeFormScene | TypeFormScene[];
  };
}

export interface IResourceActionBulkOptionsCreate extends IResourceActionBulkOptionsBase {}

export interface IResourceActionRowOptionsView extends IResourceActionRowOptionsBase {}

export interface IResourceActionRowOptionsUpdate extends IResourceActionRowOptionsBase {}

export interface IResourceActionRowOptionsDelete extends IResourceActionRowOptionsBase {}

export interface IResourceActionRowOptionsSubmit extends IResourceActionRowOptionsBase {}
export interface IResourceActionRowOptionsBack extends IResourceActionRowOptionsBase {}

export interface IResourceActionBulkOptionsOperationsBulk extends IResourceActionBulkOptionsBase {
  actions?: IResourceComponentActionBulkOptionsAction[];
}

export interface IResourceActionRowOptionsOperationsRow extends IResourceActionRowOptionsBase {
  actions?: IResourceComponentActionRowOptionsAction[];
}

export interface IResourceComponentActionBulkOptionsAction {
  $$typeof?: ZovaJsxComponentType;
  name: keyof IResourceActionBulkRecord; // not omit operationsBulk
  render?: keyof IResourceComponentActionBulkRecord | TypeRenderComponentJsx;
  options?: IResourceActionBulkOptionsBase;
}

export interface IResourceComponentActionRowOptionsAction {
  $$typeof?: ZovaJsxComponentType;
  name: keyof IResourceActionRowRecord; // not omit operationsBulk
  render?: keyof IResourceComponentActionRowRecord | TypeRenderComponentJsx;
  options?: IResourceActionRowOptionsBase;
}
