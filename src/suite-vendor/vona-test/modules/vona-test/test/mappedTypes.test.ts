import { app } from 'vona-mock';
import { DtoUser } from '../src/dto/user.js';
import { cast, catchError, mixinClass, omitClass, partialClass, pickClass } from 'vona';
import assert from 'assert';
import { Rule } from 'vona-module-a-validation';
import { DtoProfile } from '../src/dto/profile.js';
import { Dto } from 'vona-module-a-web';

@Dto()
class DtoUserWithMarried extends omitClass(DtoUser, ['married']) {
  @Rule()
  married: boolean;
}

describe('mappedTypes.test.ts', () => {
  it('action:mappedTypes', async () => {
    await app.bean.executor.mockCtx(async () => {
      const serviceValidator = app.bean.validator;
      const data = { id: 1, name: 'tom', married: true };
      // original
      const [dataNew, err] = await catchError(async () => {
        return await serviceValidator.validate(DtoUser, data, { strict: true });
      });
      assert.deepEqual(dataNew, data, JSON.stringify(err, null, 2));
      // omitClass
      const [, err2] = await catchError(async () => {
        return await serviceValidator.validate(omitClass(DtoUser, ['married']), data, { strict: true });
      });
      assert.equal(cast(err2?.message)[0]?.keys[0], 'married');
      // omitClass and inherit
      const [dataNew3] = await catchError(async () => {
        return await serviceValidator.validate(DtoUserWithMarried, data, { strict: true });
      });
      assert.deepEqual(dataNew3, data);
      // pickClass
      const [, err4] = await catchError(async () => {
        return await serviceValidator.validate(pickClass(DtoUser, ['id', 'name']), data, { strict: true });
      });
      assert.equal(cast(err4?.message)[0]?.keys[0], 'married');
      // partialClass
      const [dataNew5] = await catchError(async () => {
        return await serviceValidator.validate(partialClass(DtoUser), {}, { strict: true });
      });
      assert.deepEqual(dataNew5, {});
      const [dataNew6] = await catchError(async () => {
        return await serviceValidator.validate(
          partialClass(DtoUser, ['id', 'name']),
          { married: true },
          { strict: true },
        );
      });
      assert.deepEqual(dataNew6, { married: true });
      // mixinClass
      const [, err7] = await catchError(async () => {
        return await serviceValidator.validate(mixinClass(DtoUser, DtoProfile), data, { strict: true });
      });
      assert.equal(cast(err7?.message)[0]?.path[0], 'email');
    });
  });
});
