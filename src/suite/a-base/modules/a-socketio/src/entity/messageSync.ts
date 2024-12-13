import { EntityBaseTemp } from 'vona-module-a-base';
import { Entity } from 'vona-module-a-database';

@Entity('aSocketIOMessageSync')
export class EntityMessageSync extends EntityBaseTemp {
  messageId: number;
  userId: number;
  messageDirection: number;
  messageRead: number;
  messageClassId: number;
}
