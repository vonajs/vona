const keywords = {};
keywords.exists = {
  async: true,
  type: 'string',
  errors: true,
  compile() {
    return async function (data, _path, _rootData, name) {
      const ctx = this;
      const res = await ctx.bean.user.exists({ [name]: data });
      if (res && (!ctx.state.user || res.id !== ctx.state.user.agent.id)) {
        const errors = [{ keyword: 'x-exists', params: [], message: ctx.text('User Exists') }];
        throw new module.meta.class.Ajv.ValidationError(errors);
      }
      if (!res && data.indexOf('__') > -1) {
        const errors = [{ keyword: 'x-exists', params: [], message: ctx.text('Cannot Contain __') }];
        throw new module.meta.class.Ajv.ValidationError(errors);
      }
      return true;
    };
  },
};
export default keywords;
