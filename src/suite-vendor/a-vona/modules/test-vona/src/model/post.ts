import type { IDecoratorModelOptions, IModelRelationBelongsTo, IModelRelationHasOne } from 'vona-module-a-orm';
import { $relation, BeanModelBase, Model } from 'vona-module-a-orm';
import { EntityPost } from '../entity/post.ts';
import { ModelUser } from './user.ts';

export interface IModelOptionsPost extends IDecoratorModelOptions {
  relations: {
    postContent: IModelRelationHasOne<'test-vona:postContent', false, 'id' | 'content'>;
    user: IModelRelationBelongsTo<ModelPost, ModelUser, true, 'id' | 'name'>;
  };
}

@Model<IModelOptionsPost>({
  entity: EntityPost,
  relations: {
    postContent: $relation.hasOne('test-vona:postContent', 'postId', { columns: ['id', 'content'] }),
    user: $relation.belongsTo(ModelPost, () => ModelUser, 'userId', { autoload: true, columns: ['id', 'name'] }),
  },
})
export class ModelPost extends BeanModelBase<EntityPost> {}
