import { describe, it } from 'node:test';
import { app } from 'vona-mock';
import { Op } from 'vona-module-a-database';

describe('modelWhere.test.ts', () => {
  it('action:modelWhere', async () => {
    await app.bean.executor.mockCtx(async () => {
      const scopeTest = app.bean.scope('test-vona');
      // op: normal
      const builder = scopeTest.model.post.builder();
      scopeTest.model.post.buildWhere(builder, { id: 1 });
      const sql = builder.toQuery();
      console.log('-----------------');
      console.log(sql);
    });
  });
});
