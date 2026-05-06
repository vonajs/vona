import type { types } from 'typestyle';

import { TableIdentity } from 'table-identity';

import type { TypeFormScene } from './formMeta.ts';
import type { TypeRenderComponentJsx } from './rest.ts';
import type { ZovaJsxComponentType } from './zovaJsx.ts';

export type IResourceActionBulkRecord = {
  [KEY in keyof IResourceComponentActionBulkRecord as KEY extends `Action${infer Rest}`
    ? Uncapitalize<Rest>
    : KEY]: IResourceComponentActionBulkRecord[KEY];
};

export type IResourceActionRowRecord = {
  [KEY in keyof IResourceComponentActionRowRecord as KEY extends `Action${infer Rest}`
    ? Uncapitalize<Rest>
    : KEY]: IResourceComponentActionRowRecord[KEY];
};

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
  resource?: string;
  permission?: {
    action?: keyof IResourceActionBulkRecord;
    public?: boolean;
  };
}

export interface IResourceActionRowOptionsBase {
  class?: any;
  style?: types.NestedCSSProperties;
  resource?: string;
  id?: TableIdentity;
  permission?: {
    action?: keyof IResourceActionRowRecord;
    public?: boolean;
    formScene?: TypeFormScene | TypeFormScene[];
  };
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
