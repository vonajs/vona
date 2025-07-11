import type { IDecoratorModelOptions, IModelRelationBelongsTo, IModelRelationHasOne } from 'vona-module-a-database';
import { $relation, BeanModelBase, Model } from 'vona-module-a-database';
import { EntityPost } from '../entity/post.ts';
import { ModelPostContent } from './postContent.ts';
import { ModelUser } from './user.ts';

export interface IModelOptionsPost extends IDecoratorModelOptions {
  relations: {
    postContent: IModelRelationHasOne<ModelPostContent>;
    user: IModelRelationBelongsTo<ModelPost, ModelUser, true>;
  };
}

@Model<IModelOptionsPost>({
  entity: EntityPost,
  relations: {
    postContent: $relation.hasOne(() => ModelPostContent, 'postId'),
    user: $relation.belongsTo(ModelPost, () => ModelUser, 'userId', { autoload: true, columns: ['id', 'name'] }),
  },
})
export class ModelPost extends BeanModelBase<EntityPost> {}
