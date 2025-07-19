import assert from 'node:assert';
import { describe, it } from 'node:test';
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
          // name: 'tom',
          married: 1,
        },
      };
      const schema = $schema(DtoUserRef);
      const res = await schema.parseAsync(data);
      console.log(res);
    });
  });
});
