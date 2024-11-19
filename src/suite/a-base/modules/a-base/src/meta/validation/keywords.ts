import { VonaContext } from 'vona';

const exists = {
  async: true,
  type: 'string',
  errors: true,
  compile() {
    return async function (this: VonaContext, data, _path, _rootData, name) {
      const ctx = this;
      const res = await ctx.app.bean.user.exists({ [name]: data });
      if (res && (!ctx.state.user || res.id !== ctx.state.user.agent.id)) {
        const errors: any[] = [{ keyword: 'x-exists', params: [], message: ctx.text('User Exists') }];
        throw new ctx.app.bean.ajv.Ajv.ValidationError(errors);
      }
      if (!res && data.indexOf('__') > -1) {
        const errors: any[] = [{ keyword: 'x-exists', params: [], message: ctx.text('Cannot Contain __') }];
        throw new ctx.app.bean.ajv.Ajv.ValidationError(errors);
      }
      return true;
    };
  },
};
export default { exists };
