import type { TableIdentity } from 'table-identity';

import type { IResourceRecord } from './resource.ts';
import type { TypeRenderComponent } from './rest.ts';

export interface IResourceComponentBlockRecord {}

export interface IResourceBlockOptionsBase {
  class?: any;
  resource?: keyof IResourceRecord;
  id?: TableIdentity;
  blocks?: IResourceComponentBlockOptionsBlock[];
}

export interface IResourceBlockPresetOptionsBase {
  preset?: IResourceComponentBlockRecord;
}

export interface IResourceBlockOptionsPageEntry extends IResourceBlockOptionsBase {}

export interface IResourceComponentBlockOptionsBlock extends IResourceComponentBlockOptions {}

// export interface IResourceComponentBlockOptionsBlock {
//   name: keyof IResourceComponentBlockRecord;
//   options: IResourceComponentBlockOptions;
// }

export interface IResourceComponentBlockOptions {
  render?: TypeRenderComponent;
  preset?: IResourceComponentBlockRecord;
}
