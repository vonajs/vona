import { EntityBase } from '@cabloy/core';

export interface EntityMessage extends EntityBase {
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
