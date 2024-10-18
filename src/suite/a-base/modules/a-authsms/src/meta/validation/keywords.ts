import { CabloyContext } from 'vona';

const keywords: any = {};
keywords.exists = {
  async: true,
  type: 'string',
  errors: true,
  compile() {
    return async function (this: CabloyContext, data, _path, _rootData, name) {
      const ctx = this;
      const res = await ctx.bean.user.exists({ [name]: data });
      if (res && res.id !== ctx.state.user.agent.id) {
        const errors: any[] = [{ keyword: 'x-exists', params: [], message: ctx.text('Element Exists') }];
        throw new ctx.bean.ajv.Ajv.ValidationError(errors);
      }
      if (!res && data.indexOf('__') > -1) {
        const errors: any[] = [{ keyword: 'x-exists', params: [], message: ctx.text('Cannot Contain __') }];
        throw new ctx.bean.ajv.Ajv.ValidationError(errors);
      }
      return true;
    };
  },
};
export default keywords;
