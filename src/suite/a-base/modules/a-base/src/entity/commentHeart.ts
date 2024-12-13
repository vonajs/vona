import { EntityItemBase } from 'vona-module-a-base';
import { Entity } from 'vona-module-a-database';

@Entity('aCommentHeart')
export class EntityCommentHeart extends EntityItemBase {
  userId: number;
  commentId: number;
  heart: number;
}
