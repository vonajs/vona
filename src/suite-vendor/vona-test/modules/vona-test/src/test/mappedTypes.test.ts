import { app } from 'egg-born-mock';
import { DtoUser } from '../dto/user.js';

describe('mappedTypes.test.ts', () => {
  it('action:mappedTypes', async () => {
    await app.meta.mockUtil.mockCtx(async _ctx => {
      const serviceValidator = app.bean._getBean('a-validator.service.validator');
      const data = { id: 1, name: '1', married: true };
      const dataNew = await serviceValidator.validate(DtoUser, data);
      console.log(dataNew);
    });
  });
});
