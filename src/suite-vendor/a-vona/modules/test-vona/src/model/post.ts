import type { IDecoratorModelOptions, IModelRelationBelongsTo, IModelRelationHasOne } from 'vona-module-a-database';
import { $relation, BeanModelBase, Model } from 'vona-module-a-database';
import { EntityPost } from '../entity/post.ts';
import { ModelPostContent } from './postContent.ts';
import { ModelUser } from './user.ts';

// <'postContent' | 'user'>
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
export class ModelPost extends BeanModelBase<EntityPost> {
  async test() {
    const users = await this.scope.model.user.select({
      include: {
        roles: {
          include: { users: { include: { posts: true } } },
        },
      },
    });
    console.log(users[0].roles[0].users[0].posts[0].user?.name);

    const items = await this.scope.model.post.select({
      include: {
        postContent: {
          columns: ['content'],
          include: { post: { include: { user: { columns: 'name' } } } },
        },
        user: { columns: 'name' },
      },
      with: {
        user3: $relation.belongsTo(ModelPost, () => ModelUser, 'userId', { columns: ['id', 'name'] }),
      },
    });
    console.log(items[0].postContent?.post?.user);
    console.log(items[0].user?.name);
    console.log(items[0].user3?.name);

    const items2 = await this.scope.model.post.select({
      // include: {},
      with: {
        user3: $relation.belongsTo(ModelPost, () => ModelUser, 'userId', { columns: ['id', 'name'] }),
      },

    });
    console.log(items2[0].user3?.name);
  }
}
