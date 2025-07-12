import { describe, it } from 'node:test';
import { app } from 'vona-mock';
import { buildWhere } from 'vona-module-a-database';
import { EntityPost } from 'vona-module-test-vona';

describe('modelWhere.test.ts', () => {
  it('action:modelWhere', async () => {
    await app.bean.executor.mockCtx(async () => {
      const scopeTest = app.bean.scope('test-vona');
      scopeTest.model.post.buildWhere(scopeTest.model.post.builder(),{'_and_':{''}});
      buildWhere<EntityPost>(scopeTest.model.post.builder(),{''})
    });
  });
});
