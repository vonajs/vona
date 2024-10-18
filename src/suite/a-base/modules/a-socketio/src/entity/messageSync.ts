import { EntityBase } from 'vona';

export interface EntityMessageSync extends EntityBase {
  messageId: number;
  userId: number;
  messageDirection: number;
  messageRead: number;
  messageClassId: number;
}
