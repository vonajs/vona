import type { IDecoratorModelOptions } from 'vona-module-a-database';
import { $relation, BeanModelBase, Model } from 'vona-module-a-database';
import { EntityPostContent } from '../entity/postContent.ts';
import { ModelPost } from './post.ts';

export interface IModelOptionsPostContent extends IDecoratorModelOptions {}

@Model<IModelOptionsPostContent>({
  entity: EntityPostContent,
  relations: {
    post: $relation.belongsTo<ModelPostContent>(() => ModelPost, 'postId'),
  },
})
export class ModelPostContent extends BeanModelBase<EntityPostContent> {}
