import assert from 'node:assert';
import { describe, it } from 'node:test';
import { app } from 'vona-mock';
import { getTargetDecoratorRules } from 'vona-module-a-openapi';
import { $Dto } from 'vona-module-a-orm';
import { ModelUserStatsGroup } from 'vona-module-test-vona';

describe('dtoGroup.test.ts', () => {
  it('action:dtoGroup', async () => {
    await app.bean.executor.mockCtx(async () => {
      const DtoUserAggr = $Dto.group('test-vona:user', ['name'], {
        count: ['*', 'age'],
        sum: ['age'],
        avg: 'age',
        // max: 'age',
        // min: 'age',
      });
      let rules: any;
      rules = getTargetDecoratorRules(DtoUserAggr.prototype);
      assert.equal(rules.name._def.typeName, 'ZodString');
      assert.equal(rules.count_all._def.typeName, 'ZodOptional');
      assert.equal(rules.count_all._def.innerType._def.typeName, 'ZodUnion');
      assert.equal(rules.count_all._def.innerType._def.options[0]._def.typeName, 'ZodString');
      assert.equal(rules.count_all._def.innerType._def.options[1]._def.typeName, 'ZodNumber');
      assert.equal(rules.count_age._def.typeName, 'ZodOptional');
      assert.equal(rules.sum_age._def.typeName, 'ZodOptional');
      assert.equal(rules.avg_age._def.typeName, 'ZodOptional');
      assert.equal(rules.max_age, undefined);
      assert.equal(rules.min_age, undefined);
      // group: userStats: posts: autoload
      const DtoUserStats = $Dto.get(() => ModelUserStatsGroup, {
        columns: 'name',
        include: { roles: true },
      });
      rules = getTargetDecoratorRules(DtoUserStats.prototype);
      assert.equal(rules.name._def.typeName, 'ZodString');
      assert.equal(rules.iid, undefined);
      assert.equal(rules.posts._def.typeName, 'ZodEffects');
      assert.equal(rules.roles._def.typeName, 'ZodEffects');
    });
  });
});
