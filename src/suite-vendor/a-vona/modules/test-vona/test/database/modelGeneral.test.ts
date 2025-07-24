import assert from 'node:assert';
import { describe, it } from 'node:test';
import { isNil } from '@cabloy/utils';
import { app } from 'vona-mock';

describe('model.test.ts', () => {
  it('action:model:defaultValue', async () => {
    await app.bean.executor.mockCtx(async () => {
      // scope
      const scopeTest = app.bean.scope('test-vona');
      const item = await scopeTest.model.test.insert();
      assert.equal(isNil(item.testDate), false);
    });
  });
});
