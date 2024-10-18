import { EntityItemBase } from 'vona';

export interface EntityShareRecordUV extends EntityItemBase {
  userIdSource: number;
  userIdTarget: number;
}
