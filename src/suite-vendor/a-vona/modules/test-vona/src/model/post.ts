import type { IDecoratorModelOptions } from 'vona-module-a-database';
import { $relation, BeanModelBase, Model } from 'vona-module-a-database';
import { EntityPost } from '../entity/post.ts';
import { ModelPostContent } from './postContent.ts';

export interface IModelOptionsPost extends IDecoratorModelOptions<'postContent'> {}

@Model<IModelOptionsPost>({
  entity: EntityPost,
  relations: {
    postContent: $relation.hasOne(ModelPostContent, 'postId'),
  },
})
export class ModelPost extends BeanModelBase<EntityPost> {
  test() {
    // this.scope.model.postContent
  }
}
