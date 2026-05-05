import type { types } from 'typestyle';

import type { IResourceComponentActionRowRecord } from './actions.ts';
import type { TypeRenderComponentJsx } from './rest.ts';

export interface IResourceComponentTableCellRecord {}

export interface IResourceTableCellOptionsBase {
  class?: any;
  style?: types.NestedCSSProperties;
}

export interface IResourceComponentTableCellOptionsCell {
  render?: keyof IResourceComponentTableCellRecord | TypeRenderComponentJsx;
  options?: IResourceTableCellOptionsBase;
}

export interface IResourceComponentTableCellActionRowRecord
  extends IResourceComponentTableCellRecord, IResourceComponentActionRowRecord {}
