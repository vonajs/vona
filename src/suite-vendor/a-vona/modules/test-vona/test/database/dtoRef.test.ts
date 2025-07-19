import assert from 'node:assert';
import { describe, it } from 'node:test';
import { cast } from 'vona';
import { app } from 'vona-mock';
import { $schema } from 'vona-module-a-openapi';
import { DtoUserRef } from 'vona-module-test-vona';

describe('dtoRef.test.ts', () => {
  it('action:dtoRef', async () => {
    await app.bean.executor.mockCtx(async () => {
      const data = {
        name: 'kevin',
        other: 'other',
        user: {
          id: 1,
          name: 'tom',
          married: 1,
        },
        users: [{ id: 2, name: 'jimmy', married: 0 }],
      };
      const schema = $schema(DtoUserRef);
      const res = await schema.parseAsync(data);
      assert.equal(res.name, 'kevin');
      assert.equal(cast(res).other, undefined);
      assert.equal(res.user?.name, 'tom');
      assert.equal(cast(res.user)?.married, undefined);
      assert.equal(res.users?.length, 1);
      assert.equal(res.users?.[0].name, 'jimmy');
      assert.equal(cast(res.users?.[0])?.married, undefined);
    });
  });
});
