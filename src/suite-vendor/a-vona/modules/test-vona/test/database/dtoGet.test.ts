import assert from 'node:assert';
import { describe, it } from 'node:test';
import { app } from 'vona-mock';
import { getTargetDecoratorRules } from 'vona-module-a-openapi';
import { $Dto, $relationDynamic } from 'vona-module-a-orm';
import { ModelPost, ModelPostContent, ModelRole, ModelRoleUser, ModelUser } from 'vona-module-test-vona';

describe('dtoGet.test.ts', () => {
  it('action:dtoGet', async () => {
    await app.bean.executor.mockCtx(async () => {
      await app.bean.executor.mockCtx(async () => {
        const DtoPostNew = $Dto.get(ModelPost, {
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
        assert.equal(['ZodString', 'ZodNumber'].includes(rules.id._def.typeName), true);
        assert.equal(rules.title._def.typeName, 'ZodString');
        assert.equal(['ZodString', 'ZodNumber'].includes(rules.userId._def.typeName), true);
        assert.equal(rules.iid, undefined);
        assert.equal(rules.postContent._def.typeName, 'ZodOptional');
        assert.equal(rules.user._def.typeName, 'ZodOptional');
        assert.equal(rules.user3._def.typeName, 'ZodOptional');
      });
    });
  });
  it('action:dtoGet:categoryTree', async () => {
    await app.bean.executor.mockCtx(async () => {
      await app.bean.executor.mockCtx(async () => {
        const DtoCategoryTree = $Dto.get('test-vona:category', { columns: ['id', 'name'], include: { children: { columns: ['id'] } } });
        const rules: any = getTargetDecoratorRules(DtoCategoryTree.prototype);
        assert.equal(rules.children._def.typeName, 'ZodEffects');
        assert.equal(rules.iid, undefined);
        const DtoCategoryChain = $Dto.get('test-vona:categoryChain', { columns: ['id', 'name', 'categoryIdParent'] });
        const _apiJson = await app.bean.scope('a-openapi').service.openapi.generateJsonOfClass(DtoCategoryChain);
        // console.log(JSON.stringify(apiJson.components));
      });
    });
  });
});
