import { TableIdentity } from 'table-identity';

import type { IResourceRecord } from './resource.ts';

export interface IResourceActionBulkRecord {}

export interface IResourceActionRowRecord {}

export type IResourceActionComponentBulkRecord = {
  [key in keyof IResourceActionBulkRecord as `action${Capitalize<key>}`]: IResourceActionBulkRecord[key];
};

export type IResourceActionComponentRowRecord = {
  [key in keyof IResourceActionRowRecord as `action${Capitalize<key>}`]: IResourceActionRowRecord[key];
};

export interface IResourceActionBulkOptionsBase {
  resource?: keyof IResourceRecord;
}

export interface IResourceActionRowOptionsBase {
  resource?: keyof IResourceRecord;
  id?: TableIdentity;
  class?: any;
}
