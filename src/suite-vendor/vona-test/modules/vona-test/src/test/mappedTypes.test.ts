import { app } from 'egg-born-mock';
import { DtoUser } from '../dto/user.js';
import { Cast, catchError, Dto } from 'vona';
import assert from 'assert';
import { omitType, pickType, Rule } from 'vona-module-a-validator';
import { z } from 'zod';

@Dto()
class DtoUserWithMarried extends omitType(DtoUser, ['married']) {
  @Rule(z.boolean())
  married: boolean;
}

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
      const [, err2] = await catchError(async () => {
        return await serviceValidator.validate(omitType(DtoUser, ['married']), data, { strict: true });
      });
      assert.equal(Cast(err2?.message)[0]?.keys[0], 'married');
      // omitType and inherit
      const [dataNew3] = await catchError(async () => {
        return await serviceValidator.validate(DtoUserWithMarried, data, { strict: true });
      });
      assert.deepEqual(dataNew3, data);
      // pickType
      const [, err4] = await catchError(async () => {
        return await serviceValidator.validate(pickType(DtoUser, ['id', 'name']), data, { strict: true });
      });
      assert.equal(Cast(err4?.message)[0]?.keys[0], 'married');
    });
  });
});
