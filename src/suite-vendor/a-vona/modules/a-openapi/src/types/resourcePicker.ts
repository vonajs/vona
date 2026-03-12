import type { IResourceRecord } from './resource.ts';

export interface IResourcePickerOptions {
  resource: keyof IResourceRecord;
  idKey?: string;
  nameKey?: string;
}
