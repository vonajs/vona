import { CabloyContext } from '@cabloy/core';

const keywords: any = {};
keywords.productCode = {
  async: true,
  type: 'string',
  errors: true,
  compile() {
    return async function (this: CabloyContext, data /* , path, rootData , name*/) {
      // ignore if empty
      if (!data) return true;
      // ctx
      const ctx = this;
      // validateHost
      if (!ctx.meta || !ctx.meta.validateHost) {
        // not check
        return true;
      }
      const atomId = ctx.meta.validateHost.key.atomId;
      const item = await ctx.model.queryOne(
        `
          select a.id from aAtom a
            left join testFlowProduct b on a.id=b.atomId
              where a.atomStage=0 and a.iid=? and a.deleted=0 and b.productCode=?
          `,
        [ctx.instance.id, data],
      );
      if (item && item.id !== atomId) {
        const errors: any[] = [{ keyword: 'x-productCode', params: [], message: ctx.text('Product Code Exists') }];
        throw new ctx.bean.ajv.Ajv.ValidationError(errors);
      }
      return true;
    };
  },
};
export default keywords;
