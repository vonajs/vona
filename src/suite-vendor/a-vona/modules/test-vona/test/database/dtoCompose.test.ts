import assert from 'node:assert';
import { describe, it } from 'node:test';
import { app } from 'vona-mock';
import { $Dto, $relationDynamic } from 'vona-module-a-database';
import { getTargetDecoratorRules } from 'vona-module-a-openapi';
import { ModelPost, ModelPostContent, ModelRole, ModelRoleUser, ModelUser } from 'vona-module-test-vona';

describe('dtoCompose.test.ts', () => {
  it('action:dtoCompose', async () => {
    await app.bean.executor.mockCtx(async () => {
      await app.bean.executor.mockCtx(async () => {
        const DtoPostNew = $Dto.compose(ModelPost, {
          columns: ['id', 'title', 'userId'],
          include: {
            postContent: {
              columns: ['id', 'content'],
              include: {
                post: { include: { user: { columns: ['id'] } } },
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
        const rules: any = getTargetDecoratorRules(DtoPostNew.prototype);
        assert.equal(rules.id._def.typeName, 'ZodUnion');
        assert.equal(rules.title._def.typeName, 'ZodString');
        assert.equal(rules.userId._def.typeName, 'ZodUnion');
        assert.equal(rules.iid, undefined);
        assert.equal(rules.postContent._def.typeName, 'ZodLazy');
        assert.equal(rules.user._def.typeName, 'ZodLazy');
        assert.equal(rules.user3._def.typeName, 'ZodLazy');
      });
    });
  });
  it('action:dtoCompose:categoryTree', async () => {
    await app.bean.executor.mockCtx(async () => {
      await app.bean.executor.mockCtx(async () => {
        const DtoCategoryTree = $Dto.compose('test-vona:category', { columns: ['id', 'name'], include: { children: { columns: ['id'] } } });
        const rules: any = getTargetDecoratorRules(DtoCategoryTree.prototype);
        assert.equal(rules.children._def.typeName, 'ZodEffects');
        assert.equal(rules.iid, undefined);
      });
    });
  });
});
