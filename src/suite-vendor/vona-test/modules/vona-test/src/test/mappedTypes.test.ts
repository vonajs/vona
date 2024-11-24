import { app } from 'egg-born-mock';
import { DtoUser } from '../dto/user.js';
import { catchError } from 'vona';
import assert from 'assert';

describe('mappedTypes.test.ts', () => {
  it('action:mappedTypes', async () => {
    await app.meta.mockUtil.mockCtx(async _ctx => {
      const serviceValidator = app.bean._getBean('a-validator.service.validator');
      const data = { id: 1, name: 'tom', married: true };
      // original
      const [dataNew] = await catchError(async () => {
        return await serviceValidator.validate(DtoUser, data, { strict: true });
      });
      assert.deepEqual(dataNew, data);
      // omitType
    });
  });
});
