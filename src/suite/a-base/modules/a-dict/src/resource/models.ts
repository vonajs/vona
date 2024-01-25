export * from '../model/dict.js';
export * from '../model/dictContent.js';

import { ModelDict } from '../model/dict.js';
import { ModelDictContent } from '../model/dictContent.js';

export interface IModuleModel {
  dict: ModelDict;
  dictContent: ModelDictContent;
}
