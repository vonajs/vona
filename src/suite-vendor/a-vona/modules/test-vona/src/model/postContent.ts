import type { IDecoratorModelOptions, IModelRelationBelongsTo } from 'vona-module-a-database';
import { $relation, BeanModelBase, Model } from 'vona-module-a-database';
import { EntityPostContent } from '../entity/postContent.ts';
import { ModelPost } from './post.ts';

export interface IModelOptionsPostContent extends IDecoratorModelOptions {
  relations: {
    post: IModelRelationBelongsTo<ModelPostContent, ModelPost>;
  };

}

@Model<IModelOptionsPostContent>({
  entity: EntityPostContent,
  relations: {
    post: $relation.belongsTo(ModelPostContent, () => ModelPost, 'postId'),
  },
})
export class ModelPostContent extends BeanModelBase<EntityPostContent> {}
