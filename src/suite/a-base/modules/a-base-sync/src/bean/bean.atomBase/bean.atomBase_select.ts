// const moduleInfo = module.info;
module.exports = class AtomBase {
  async selectQuery({ atomClass, options, user }) {
    return await this.ctx.bean.atom._selectQuery({ atomClass, options, user });
  }

  async select({ atomClass, options, items, user }) {
    if (items.length === 0) return;
    // validate
    await this._selectValidate({ atomClass, items, options, user });
    // atomClass
    const atomClassBase = atomClass ? await this.ctx.bean.atomClass.atomClass(atomClass) : null;
    // patchAtomClassInfo
    await this._patchAtomClassInfo({ items, atomClass });
    // dict translate
    await this._dictTranslate({ items, atomClassBase });
    // atomCategoryName
    await this._atomCategoryIdTranslate({ items, atomClassBase });
    // revision
    this._appendRevisionToHistory({ items, atomClassBase });
    // atomLanguage
    this._atomLanguageLocaleTranslate({ items, atomClassBase });
    // atomDisabled
    this._atomDisabledTranslate({ items, atomClassBase });
    // atomState
    await this._atomStateTranslate({ items, atomClassBase });
    // userIds
    await this._userIdsTranslate({ items, atomClassBase });
    // atomNameLocale for resource
    this._atomNameLocaleTranslate({ items, atomClassBase });
  }

  async _selectValidate({ atomClass, items, options, user }) {
    // schema/tableName: see also: _prepare_fieldsRight
    if (!options.schema || options.schema.isSchemaBase || options.tableName.indexOf(' ') === -1) return;
    for (let index = 0; index < items.length; index++) {
      const item = await this._readValidate({ atomClass, item: items[index], options, user });
      items[index] = item;
    }
  }
};
