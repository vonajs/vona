import type { DtoSerializerTest } from 'vona-module-test-vona';
import assert from 'node:assert';
import { describe, it } from 'node:test';
import { app } from 'vona-mock';

describe('serializer.test.ts', () => {
  it('action:serializer', async () => {
    await app.bean.executor.mockCtx(async () => {
      const data = {
        password: '123456',
        password2: '123456',
        email: 'kevin@cabloy.com',
        email2: 'kevin@cabloy.com',
        email3: 'kevin@cabloy.com',
        email4: 'kevin@cabloy.com',
        email5: 'kevin@cabloy.com',
        email6: 'kevin@cabloy.com',
        email7: 'kevin@cabloy.com',
        firstName: 'k',
        lastName: 'v',
      } as DtoSerializerTest;
      const res: DtoSerializerTest = await app.bean.executor.performAction('post', '/test/vona/serializer/echoSimple', {
        body: data,
      });
      assert.equal(res.password, '123456');
    });
  });
});
