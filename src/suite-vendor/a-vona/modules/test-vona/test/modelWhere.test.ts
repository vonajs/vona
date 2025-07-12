import assert from 'node:assert';
import { describe, it } from 'node:test';
import { app } from 'vona-mock';

describe('modelWhere.test.ts', () => {
  it('action:modelWhere', async () => {
    await app.bean.executor.mockCtx(async () => {
      const scopeTest = app.bean.scope('test-vona');
      // op: normal
      const builder = scopeTest.model.post.builder();
      scopeTest.model.post.buildWhere(builder, { id: 1 });
      const sql = builder.toQuery();
      assert.equal(sql, 'select * from "testVonaPost" where "id" = 1');
    });
  });
});
