import type { IRoleIdRecord, IRoleNameRecord } from 'vona-module-a-user';

export interface IOpenapiActionRecord {
  create: boolean;
  view: boolean;
  update: boolean;
  delete: boolean;
}

export type IOpenapiPermissionModeActionActions = {
  [K in keyof IOpenapiActionRecord]?: IOpenapiActionRecord[K];
};

export interface IOpenapiPermissions {
  roleIds?: (keyof IRoleIdRecord)[];
  roleNames?: (keyof IRoleNameRecord)[];
  actions?: IOpenapiPermissionModeActionActions;
}
