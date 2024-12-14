import { IMetaRecord } from '../interface/meta.js';
import { OmitNever } from '../utils/omitNever.js';

export interface ConfigOnions {
  meta: OmitNever<IMetaRecord>;
}
