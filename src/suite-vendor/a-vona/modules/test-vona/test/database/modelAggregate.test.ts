import assert from 'node:assert';
import { describe, it } from 'node:test';
import { cast } from 'vona';
import { app } from 'vona-mock';

describe('modelRelations.test.ts', () => {
  it('action:modelRelations', async () => {
    await app.bean.executor.mockCtx(async () => {
      const prefix = 'action:modelRelations';
      // scope
      const scopeTest = app.bean.scope('test-vona');
      // aggr
      const usersStat = await scopeTest.model.user.aggregate({
        aggrs: {
          count: '*',

        },
      });
    });
  });
});
