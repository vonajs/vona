import { app } from 'egg-born-mock';
import { DtoUser } from '../dto/user.js';
import { catchError } from 'vona';
import assert from 'assert';
import { omitType } from 'vona-module-a-validator';

describe('mappedTypes.test.ts', () => {
  it('action:mappedTypes', async () => {
    await app.meta.mockUtil.mockCtx(async _ctx => {
      const serviceValidator = app.bean._getBean('a-validator.service.validator');
      const data = { id: 1, name: 'tom', married: true };
      // original
      const [dataNew, err] = await catchError(async () => {
        return await serviceValidator.validate(DtoUser, data, { strict: true });
      });
      assert.deepEqual(dataNew, data, JSON.stringify(err, null, 2));
      // omitType
      const [dataNew2, err2] = await catchError(async () => {
        return await serviceValidator.validate(omitType(DtoUser, ['married']), data, { strict: true });
      });
      assert.deepEqual(dataNew2, data, JSON.stringify(err2, null, 2));
    });
  });
});
