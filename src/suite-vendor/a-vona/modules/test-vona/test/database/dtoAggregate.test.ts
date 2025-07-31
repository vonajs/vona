import assert from 'node:assert';
import { describe, it } from 'node:test';
import { app } from 'vona-mock';
import { getTargetDecoratorRules } from 'vona-module-a-openapi';
import { $Dto } from 'vona-module-a-orm';

describe('dtoAggregate.test.ts', () => {
  it('action:dtoAggregate', async () => {
    await app.bean.executor.mockCtx(async () => {
      await app.bean.executor.mockCtx(async () => {
        const DtoUserAggr = $Dto.aggregate('test-vona:user', {
          count: ['*', 'age'],
          sum: ['age'],
          avg: 'age',
          // max: 'age',
          // min: 'age',
        });
        const rules: any = getTargetDecoratorRules(DtoUserAggr.prototype);
        assert.equal(rules.count_all._def.typeName, 'ZodOptional');
        assert.equal(rules.count_all._def.innerType._def.typeName, 'ZodUnion');
        assert.equal(rules.count_all._def.innerType._def.options[0]._def.typeName, 'ZodString');
        assert.equal(rules.count_all._def.innerType._def.options[1]._def.typeName, 'ZodNumber');
        assert.equal(rules.count_age._def.typeName, 'ZodOptional');
        assert.equal(rules.sum_age._def.typeName, 'ZodOptional');
        assert.equal(rules.avg_age._def.typeName, 'ZodOptional');
        assert.equal(rules.max_age, undefined);
      });
    });
  });
});
