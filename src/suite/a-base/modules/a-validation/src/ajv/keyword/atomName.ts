import { CabloyContext } from '@cabloy/core';

export default {
  async: true,
  type: 'string',
  errors: true,
  compile(_schema, schemaProperty) {
    return async function (this: CabloyContext, data, _path, rootData /* , name*/) {
      // ignore if empty
      if (!data) return true;
      const atomName = data.trim();
      const ctx = this;
      // validateHost
      if (!ctx.meta || !ctx.meta.validateHost) {
        // not check
        return true;
      }
      const atomId = ctx.meta.validateHost.key.atomId;
      const atomClass = ctx.meta.validateHost.atomClass;
      //   read by atomClass, atomLanguage, atomName
      const where: any = {
        atomStage: [0, 1],
        atomClassId: atomClass.id,
        atomName,
      };
      if (rootData.atomLanguage) {
        where.atomLanguage = rootData.atomLanguage;
      }
      const items = await ctx.bean.atom.model.select({ where });
      // check draft/formal
      const checkExists = await ctx.bean.util.checkAtomIdExists({ atomId, items });
      if (checkExists) {
        const _title = ctx.text(schemaProperty.ebTitle || 'Atom Name');
        const message = `${_title} ${ctx.text('ExistsValidation')}`;
        const errors: any[] = [{ keyword: 'x-atomName', params: [], message }];
        throw new ctx.bean.ajv.Ajv.ValidationError(errors);
      }
      return true;
    };
  },
};
