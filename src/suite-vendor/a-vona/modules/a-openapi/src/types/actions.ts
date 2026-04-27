import { TableIdentity } from 'table-identity';

import type { IResourceRecord } from './resource.ts';

export interface IResourceActionTableRecord {}

export interface IResourceActionRowRecord {}

export interface IResourceActionTableOptionsBase {
  resource?: keyof IResourceRecord;
}

export interface IResourceActionRowOptionsBase {
  resource?: keyof IResourceRecord;
  id?: TableIdentity;
}
