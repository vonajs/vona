export * from '../model/share.js';
export * from '../model/shareRecordPV.js';
export * from '../model/shareRecordUV.js';

import { ModelShare } from '../model/share.js';
import { ModelShareRecordPV } from '../model/shareRecordPV.js';
import { ModelShareRecordUV } from '../model/shareRecordUV.js';

export interface IModuleModel {
  share: ModelShare;
  shareRecordPV: ModelShareRecordPV;
  shareRecordUV: ModelShareRecordUV;
}
