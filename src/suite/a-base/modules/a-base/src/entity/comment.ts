import { EntityItemBase } from 'vona';

export interface EntityComment extends EntityItemBase {
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
