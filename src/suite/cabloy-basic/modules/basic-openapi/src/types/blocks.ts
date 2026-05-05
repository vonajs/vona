import type { TableIdentity } from 'table-identity';

import 'vona-module-a-openapi';
import type {
  IResourceBlockOptionsBase,
  IResourceComponentActionRowOptionsAction,
  IResourceComponentBlockOptionsBlock,
  TypeFormScene,
} from 'vona-module-a-openapi';

export interface IResourceBlockOptionsPageEntry extends IResourceBlockOptionsBase {
  blocks?: IResourceComponentBlockOptionsBlock[];
  resource?: string;
  id?: TableIdentity;
  formScene?: TypeFormScene;
}

export interface IResourceBlockOptionsToolbarRow extends IResourceBlockOptionsBase {
  actions?: IResourceComponentActionRowOptionsAction[];
}

export interface IResourceBlockOptionsForm extends IResourceBlockOptionsBase {}

declare module 'vona-module-a-openapi' {
  export interface IResourceComponentBlockRecord {
    BlockPageEntry?: IResourceBlockOptionsPageEntry;
    BlockToolbarRow?: IResourceBlockOptionsToolbarRow;
    BlockForm?: IResourceBlockOptionsForm;
  }
}
