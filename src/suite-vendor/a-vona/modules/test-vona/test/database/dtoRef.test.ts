import assert from 'node:assert';
import { describe, it } from 'node:test';
import { $schema } from 'vona-module-a-openapi';
import { DtoUserRef } from 'vona-module-test-vona';

describe('dtoRef.test.ts', () => {
  it('action:dtoRef', async () => {
    const data = {
      name: 'kevin',
    };
    const schema=$schema(DtoUserRef);
    const res=await schema.parseAsync(data);
    console.log(res);
  });
});
