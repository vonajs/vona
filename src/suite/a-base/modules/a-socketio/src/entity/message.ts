import { EntityBaseTemp } from 'vona-module-a-base';

export interface EntityMessage extends EntityBaseTemp {
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
