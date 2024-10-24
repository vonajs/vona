import { VonaContext } from 'vona';

const keywords: any = {};
keywords.languages = {
  async: true,
  type: 'string',
  errors: true,
  compile(/* sch, parentSchema*/) {
    return async function (this: VonaContext, data) {
      const ctx = this;
      const locales = ctx.bean.base.locales();
      const index = locales.findIndex(item => item.value === data);
      if (index > -1) return true;
      const errors: any[] = [{ keyword: 'x-languages', params: [], message: ctx.text('NotExpectedValue') }];
      throw new ctx.bean.ajv.Ajv.ValidationError(errors);
    };
  },
};
export default keywords;
