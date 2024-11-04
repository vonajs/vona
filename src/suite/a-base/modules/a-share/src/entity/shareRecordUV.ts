import { EntityItemBase } from 'vona-module-a-base';

export interface EntityShareRecordUV extends EntityItemBase {
  userIdSource: number;
  userIdTarget: number;
}
