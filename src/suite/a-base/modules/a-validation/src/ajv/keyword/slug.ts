import { VonaContext } from 'vona';

export default {
  async: true,
  type: 'string',
  errors: true,
  compile() {
    return async function (this: VonaContext, data, _path, rootData /* , name*/) {
      // ignore if empty
      if (!data) return true;
      const slug = data.trim();
      // unique slug for atomLanguage and atomClass
      const ctx = this;
      // validateHost
      if (!ctx.meta || !ctx.meta.validateHost) {
        // not check
        return true;
      }
      const atomId = ctx.meta.validateHost.key.atomId;
      const atomClass = ctx.meta.validateHost.atomClass;
      //   read by atomClass, atomLanguage, slug
      const where: any = {
        'a.atomStage': [0, 1],
        'a.atomClassId': atomClass.id,
        'b.slug': slug,
      };
      if (rootData.atomLanguage) {
        where['a.atomLanguage'] = rootData.atomLanguage;
      }
      const items = await ctx.bean.atom.model.select({
        alias: 'a',
        joins: [['leftJoin', 'aCmsArticle as b', { 'a.id': 'b.atomId' }]],
        where,
      });
      // check draft/formal
      const checkExists = await ctx.bean.util.checkAtomIdExists({ atomId, items });
      if (checkExists) {
        const errors: any[] = [{ keyword: 'x-slug', params: [], message: ctx.text('Slug Exists') }];
        throw new ctx.bean.ajv.Ajv.ValidationError(errors);
      }
      return true;
    };
  },
};
