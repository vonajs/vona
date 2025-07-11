import type { IDecoratorModelOptions, IModelRelationBelongsTo, IModelRelationHasOne } from 'vona-module-a-database';
import { $relation, $relationDynamic, BeanModelBase, Model } from 'vona-module-a-database';
import { EntityPost } from '../entity/post.ts';
import { ModelPostContent } from './postContent.ts';
import { ModelUser } from './user.ts';

// <'postContent' | 'user'>
export interface IModelOptionsPost extends IDecoratorModelOptions {
  // relations: {
  //   postContent: IModelRelationHasOne<ModelPostContent>;
  //   user: IModelRelationBelongsTo<ModelPost, ModelUser, true>;
  // };
}

@Model<IModelOptionsPost>({
  entity: EntityPost,
  // relations: {
  //   postContent: $relation.hasOne(() => ModelPostContent, 'postId'),
  //   user: $relation.belongsTo(ModelPost, () => ModelUser, 'userId', { autoload: true, columns: ['id', 'name'] }),
  // },
})
export class ModelPost extends BeanModelBase<EntityPost> {
  async test() {
    await this.scope.model.post.select({ where: { id: 1 } });

    const users = await this.scope.model.user.select(
      // ['test-vona:user', 'test-vona:post'],
      {
        where: {
          'testVonaUser.iid': 'testVonaUser.iid',
        },
        include: {
          roles: {
            include: { users: { include: { posts: true } } },
          },
        },
      },
    );
    console.log(users[0].roles[0].users[0].posts[0].user?.name);

    // ['test-vona:user', 'test-vona:post'],
    const items = await this.scope.model.post.select(
      // ['test-vona:user', 'test-vona:post'],
      // undefined,
      {
        include: {
          postContent: {
            columns: ['content'],
            include: {
              post: { include: { user: { columns: 'name' } } },
            },
            with: {
              post3: $relationDynamic.belongsTo(() => ModelPostContent, () => ModelPost, 'postId', {
                include: {
                  postContent: true,
                },
              }),
            },
          },
          user: { columns: 'name' },
        },
        with: {
          user3: $relationDynamic.belongsTo(ModelPost, () => ModelUser, 'userId', {
            include: { posts: true },
            with: { postContent: $relationDynamic.hasOne(() => ModelPostContent, 'postId', {}) },
            columns: ['id', 'name'],
          }),
        },
        joins: [['innerJoin', 'testVonaUser', ['id', 'testVonaPost.id']]],
        distinct: ['userId'],
        orders: [['testVonaPost.id', 'asc', 'first']],
      },
      // ['test-vona:user','test-vona:role'],
    );
    console.log(items[0].postContent?.post3?.postContent);
    console.log(items[0].postContent?.post?.user);
    console.log(items[0].user?.name);
    console.log(items[0].user3?.posts[0].title);
    console.log(items[0].user3?.postContent?.content);

    const count = await this.scope.model.post.count({ column: 'id' });
    console.log(count);

    const items2 = await this.scope.model.post.select({
      // include: { user: false },
      with: {
        user3: $relation.belongsTo(ModelPost, () => ModelUser, 'userId', { columns: ['id', 'name'] }),
      },
    });
    console.log(items2[0].user?.name);
    console.log(items2[0].user3?.name);

    const items3 = await this.scope.model.post.mget([], {
      include: { postContent: true },
      with: {
        user3: $relation.belongsTo(ModelPost, () => ModelUser, 'userId', { columns: ['id', 'name'] }),
      },
    });
    console.log(items3[0].postContent?.content);
    console.log(items3[0].user3?.name);

    const item = await this.scope.model.post.get({ id: 1 }, {
      include: { postContent: { columns: ['content'] } },
      with: {
        user3: $relation.belongsTo(ModelPost, () => ModelUser, 'userId', { columns: ['id', 'name'] }),
      },
    });
    console.log(item?.postContent?.content);
    console.log(item?.user3?.name);
  }
}

// const a: { post: { include: { user: { columns: 'name' } } } } & { post: true };
// a.post.include.
