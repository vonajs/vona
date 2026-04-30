import type { IRoleIdRecord, IRoleNameRecord } from 'vona-module-a-user';

import type { IResourceActionTableRecord } from './actions.ts';

export type IOpenapiPermissionModeActionActions = {
  [K in keyof IResourceActionTableRecord]?: IResourceActionTableRecord[K];
};

export interface IOpenapiPermissions {
  roleIds?: (keyof IRoleIdRecord)[];
  roleNames?: (keyof IRoleNameRecord)[];
  actions?: IOpenapiPermissionModeActionActions;
}
