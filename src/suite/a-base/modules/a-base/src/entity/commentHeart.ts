import { EntityItemBase } from 'vona';

export interface EntityCommentHeart extends EntityItemBase {
  userId: number;
  commentId: number;
  heart: number;
}
