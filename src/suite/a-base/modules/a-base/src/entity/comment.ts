import { EntityItemBase } from 'vona-module-a-base';
import { Entity } from 'vona-module-a-database';

@Entity('aComment')
export class EntityComment extends EntityItemBase {
  userId: number;
  sorting: number;
  heartCount: number;
  replyId: number;
  replyUserId: number;
  replyContent: string;
  content: string;
  summary: string;
  html: string;
}
