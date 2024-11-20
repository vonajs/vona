import { VonaContext } from 'vona';

const keywords: any = {};
keywords.productCode = {
  async: true,
  type: 'string',
  errors: true,
  compile() {
    return async function (this: VonaContext, data /* , path, rootData , name*/) {
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
      const items = await ctx.app.bean.atom.model.select({
        alias: 'a',
        joins: [['leftJoin', 'testFlowProduct as b', { 'a.id': 'b.atomId' }]],
        where: {
          'a.atomStage': 0,
          'b.productCode': data,
        },
      });
      const item = items[0];
      if (item && item.id !== atomId) {
        const errors: any[] = [{ keyword: 'x-productCode', params: [], message: ctx.app.text('Product Code Exists') }];
        throw new ctx.app.bean.ajv.Ajv.ValidationError(errors);
      }
      return true;
    };
  },
};
export default keywords;
