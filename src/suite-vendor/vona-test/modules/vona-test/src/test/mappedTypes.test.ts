import { app } from 'egg-born-mock';
import { DtoUser } from '../dto/user.js';
import { catchError } from 'vona';

describe('mappedTypes.test.ts', () => {
  it('action:mappedTypes', async () => {
    await app.meta.mockUtil.mockCtx(async _ctx => {
      const serviceValidator = app.bean._getBean('a-validator.service.validator');
      const data = { id: 1, name: '1', married: true };
      const [dataNew, error] = await catchError(async () => {
        return await serviceValidator.validate(DtoUser, data);
      });
      console.log(JSON.stringify(dataNew), JSON.stringify(error?.message));
    });
  });
});
