import assert from 'node:assert';
import { describe, it } from 'node:test';
import { app } from 'vona-mock';

describe('modelWhere.test.ts', () => {
  it('action:modelWhere', async () => {
    await app.bean.executor.mockCtx(async () => {
      console.log('-------------------------------');
      const scopeTest = app.bean.scope('test-vona');
      // op: normal
      let builder = scopeTest.model.post.builder();
      scopeTest.model.post.buildWhere(builder, { id: 1 });
      let sql = builder.toQuery();
      assert.equal(sql, 'select * from "testVonaPost" where "id" = 1');
      // op: and
      builder = scopeTest.model.post.builder();
      scopeTest.model.post.buildWhere(builder, {
        _and_: { iid: 1, id: 2 },
      });
      sql = builder.toQuery();
      assert.equal(sql, 'select * from "testVonaPost" where (("iid" = 1) and ("id" = 2))');
      // op: and: empty
      builder = scopeTest.model.post.builder();
      scopeTest.model.post.buildWhere(builder, {
        _and_: { _and_: {} },
      });
      sql = builder.toQuery();
      assert.equal(sql, 'select * from "testVonaPost"');
      // op: or
      builder = scopeTest.model.post.builder();
      scopeTest.model.post.buildWhere(builder, {
        _or_: { iid: 1, id: 2 },
      });
      sql = builder.toQuery();
      assert.equal(sql, 'select * from "testVonaPost" where (("iid" = 1) or ("id" = 2))');
      ///////
      console.log(sql);
    });
  });
});
