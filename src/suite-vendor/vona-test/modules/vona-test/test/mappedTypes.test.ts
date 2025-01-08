import { app } from 'vona-mock';
import { DtoUser } from '../src/dto/user.js';
import { cast, MixinClass, OmitClass, PartialClass, PickClass } from 'vona';
import assert from 'node:assert';
import { Rule } from 'vona-module-a-openapi';
import { DtoProfile } from '../src/dto/profile.js';
import { Dto } from 'vona-module-a-web';
import { catchError } from '@cabloy/utils';

@Dto()
class DtoUserWithMarried extends OmitClass(DtoUser, ['married']) {
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
      // OmitClass
      const [, err2] = await catchError(async () => {
        return await serviceValidator.validate(OmitClass(DtoUser, ['married']), data, { strict: true });
      });
      assert.equal(cast(err2?.message)[0]?.keys[0], 'married');
      // OmitClass and inherit
      const [dataNew3] = await catchError(async () => {
        return await serviceValidator.validate(DtoUserWithMarried, data, { strict: true });
      });
      assert.deepEqual(dataNew3, data);
      // PickClass
      const [, err4] = await catchError(async () => {
        return await serviceValidator.validate(PickClass(DtoUser, ['id', 'name']), data, { strict: true });
      });
      assert.equal(cast(err4?.message)[0]?.keys[0], 'married');
      // PartialClass
      const [dataNew5] = await catchError(async () => {
        return await serviceValidator.validate(PartialClass(DtoUser), {}, { strict: true });
      });
      assert.deepEqual(dataNew5, {});
      const [dataNew6] = await catchError(async () => {
        return await serviceValidator.validate(
          PartialClass(DtoUser, ['id', 'name']),
          { married: true },
          { strict: true },
        );
      });
      assert.deepEqual(dataNew6, { married: true });
      // MixinClass
      const [, err7] = await catchError(async () => {
        return await serviceValidator.validate(MixinClass(DtoUser, DtoProfile), data, { strict: true });
      });
      assert.equal(cast(err7?.message)[0]?.path[0], 'email');
    });
  });
});
