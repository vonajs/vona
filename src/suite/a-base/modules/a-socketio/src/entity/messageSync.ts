import { EntityBaseTemp } from 'vona-module-a-base';
import { Entity } from 'vona';

@Entity('aSocketIOMessageSync')
export class EntityMessageSync extends EntityBaseTemp {
  messageId: number;
  userId: number;
  messageDirection: number;
  messageRead: number;
  messageClassId: number;
}
