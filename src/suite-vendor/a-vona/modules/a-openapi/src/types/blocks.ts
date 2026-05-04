import type { TableIdentity } from 'table-identity';
import type { types } from 'typestyle';

import type { TypeFormScene } from './formMeta.ts';
import type { TypeRenderComponentJsx } from './rest.ts';

export interface IResourceComponentBlockRecord {}

export interface IResourceBlockOptionsBase {
  class?: any;
  style?: types.NestedCSSProperties;
}

export interface IResourceComponentBlockOptionsBlock {
  render?: keyof IResourceComponentBlockRecord | TypeRenderComponentJsx;
  options?: IResourceBlockOptionsBase;
}
