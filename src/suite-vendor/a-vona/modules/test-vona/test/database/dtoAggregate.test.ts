import assert from 'node:assert';
import { describe, it } from 'node:test';
import { app } from 'vona-mock';
import { getTargetDecoratorRules } from 'vona-module-a-openapi';
import { $Dto } from 'vona-module-a-orm';
import { ModelUser } from 'vona-module-test-vona';

describe('dtoAggregate.test.ts', () => {
  it('action:dtoAggregate', async () => {
    await app.bean.executor.mockCtx(async () => {
      await app.bean.executor.mockCtx(async () => {
        const DtoUserAggr = $Dto.aggregate(ModelUser, {
          aggrs: {
            count: ['*', 'age'],
            sum: ['age'],
            avg: 'age',
            max: 'age',
            min: 'age',
          },
        });
        const rules: any = getTargetDecoratorRules(DtoUserAggr.prototype);
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
});
