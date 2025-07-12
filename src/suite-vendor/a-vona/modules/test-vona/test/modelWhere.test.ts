import { describe, it } from 'node:test';
import { app } from 'vona-mock';

describe('modelWhere.test.ts', () => {
  it('action:modelWhere', async () => {
    await app.bean.executor.mockCtx(async () => {
      const scopeTest = app.bean.scope('test-vona');
      scopeTest.model.post.buildWhere(scopeTest.model.post.builder(),{'_and_':{''}});
    });
  });
});
