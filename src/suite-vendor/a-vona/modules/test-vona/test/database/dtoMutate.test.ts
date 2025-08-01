import assert from 'node:assert';
import { describe, it } from 'node:test';
import { app } from 'vona-mock';
import { getTargetDecoratorRules } from 'vona-module-a-openapi';
import { $Dto, $relationDynamic } from 'vona-module-a-orm';
import { ModelPost } from 'vona-module-test-vona';

describe('dtoMutate.test.ts', () => {
  it('action:dtoMutate', async () => {
    await app.bean.executor.mockCtx(async () => {
      await app.bean.executor.mockCtx(async () => {
        // create
        const DtoUserCreate = $Dto.create('test-vona:user', {
          include: { posts: true },
        });
        let rules: any;
        rules = getTargetDecoratorRules(DtoUserCreate.prototype);
        assert.equal(rules.name._def.typeName, 'ZodString');
        assert.equal(rules.id, undefined);
        assert.equal(rules.iid, undefined);
        assert.equal(rules.deleted, undefined);
        assert.equal(rules.createdAt, undefined);
        assert.equal(rules.updatedAt, undefined);
        assert.equal(rules.posts._def.typeName, 'ZodOptional');
        // update
        const DtoUserUpdate = $Dto.update('test-vona:user', {
          with: {
            posts: $relationDynamic.hasMany(() => ModelPost, 'userId', { columns: ['id', 'title'] }),
          },
        });
        rules = getTargetDecoratorRules(DtoUserUpdate.prototype);
        assert.equal(rules.name._def.typeName, 'ZodOptional');
        assert.equal(rules.id, undefined);
        assert.equal(rules.iid, undefined);
        assert.equal(rules.deleted, undefined);
        assert.equal(rules.createdAt, undefined);
        assert.equal(rules.updatedAt, undefined);
        assert.equal(rules.posts._def.typeName, 'ZodOptional');
      });
    });
  });
});
