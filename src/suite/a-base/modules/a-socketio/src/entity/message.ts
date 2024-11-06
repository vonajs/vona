import { EntityBaseTemp } from 'vona-module-a-base';
import { Entity } from 'vona';

@Entity('aSocketIOMessage')
export class EntityMessage extends EntityBaseTemp {
  messageClassId: number;
  messageType: number;
  messageFilter: string;
  messageGroup: number;
  messageScene: string;
  userIdTo: number;
  userIdFrom: number;
  sessionId: string;
  content: string;
}
