import { EntityItemBase } from 'vona-module-a-base';
import { Entity } from 'vona';

@Entity('aCommentHeart')
export class EntityCommentHeart extends EntityItemBase {
  userId: number;
  commentId: number;
  heart: number;
}
