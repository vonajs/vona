import { EntityBaseTemp } from 'vona-module-a-base';

export interface EntityMessageSync extends EntityBaseTemp {
  messageId: number;
  userId: number;
  messageDirection: number;
  messageRead: number;
  messageClassId: number;
}
