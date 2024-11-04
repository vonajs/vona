import { EntityItemBase } from 'vona-module-a-base';

export interface EntityCommentHeart extends EntityItemBase {
  userId: number;
  commentId: number;
  heart: number;
}
