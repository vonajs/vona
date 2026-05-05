import type { types } from 'typestyle';

import type { TypeRenderComponentJsx } from './rest.ts';
import type { ZovaJsxComponentType } from './zovaJsx.ts';

export interface IResourceComponentBlockRecord {}

export interface IResourceBlockOptionsBase {
  class?: any;
  style?: types.NestedCSSProperties;
}

export interface IResourceComponentBlockOptionsBlock {
  $$typeof?: ZovaJsxComponentType;
  render?: keyof IResourceComponentBlockRecord | TypeRenderComponentJsx;
  options?: IResourceBlockOptionsBase;
}
