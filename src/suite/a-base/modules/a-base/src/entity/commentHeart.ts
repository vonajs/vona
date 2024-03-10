import {} from '@cabloy/core';

export interface EntityCommentHeart extends EntityItemBase {
  userId: number;
  commentId: number;
  heart: number;
}
