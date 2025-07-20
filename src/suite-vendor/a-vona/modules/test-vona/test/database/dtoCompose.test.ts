import assert from 'node:assert';
import { describe, it } from 'node:test';
import { app } from 'vona-mock';
import { $Dto, $relationDynamic } from 'vona-module-a-database';
import { ModelPost, ModelPostContent, ModelRole, ModelRoleUser, ModelUser } from 'vona-module-test-vona';

describe('dtoCompose.test.ts', () => {
  it('action:dtoCompose', async () => {
    await app.bean.executor.mockCtx(async () => {
      await app.bean.executor.mockCtx(async () => {
        const DtoPostNew = $Dto.compose(ModelPost, {
          columns: ['id', 'title', 'userId'],
          include: {
            postContent: {
              columns: ['id', 'postId', 'content'],
              include: {
                post: { include: { user: { columns: '*' } } },
              },
              with: {
                post3: $relationDynamic.belongsTo(() => ModelPostContent, () => ModelPost, 'postId', {
                  include: {
                    postContent: true,
                  },
                }),
              },
            },
          },
          with: {
            user3: $relationDynamic.belongsTo(ModelPost, () => ModelUser, 'userId', {
              include: { posts: true },
              with: { roles: $relationDynamic.belongsToMany(() => ModelRoleUser, () => ModelRole, 'userId', 'roleId') },
              columns: ['id', 'name'],
            }),
          },
        });
        console.log(DtoPostNew);
      });
    });
  });
});
