const mparse = require('@cabloy/module-parse').default;

module.exports = class Atom {
  // create
  async create({ atomClass, atomStage, roleIdOwner, item, options, createOptions, user }) {
    options = options || {};
    if (createOptions) {
      options.createOptions = createOptions;
    }
    // for safety
    delete options.__createDelayData;
    // atomClass
    atomClass = await this.ctx.bean.atomClass.get(atomClass);
    const atomClassBase = await this.ctx.bean.atomClass.atomClass(atomClass);
    // atomSimple
    const atomSimple = Number(Boolean(atomClassBase.simple));
    // item
    item = item || {};
    if (!atomClassBase.itemOnly) {
      item.atomStage = atomStage !== undefined ? atomStage : atomSimple;
      item.roleIdOwner = roleIdOwner;
    }
    // atom bean
    const _moduleInfo = mparse.parseInfo(atomClass.module);
    const beanFullName = `${_moduleInfo.relativeName}.atom.${atomClassBase.bean}`;
    const data = await this.ctx.meta.util.executeBeanAuto({
      beanModule: _moduleInfo.relativeName,
      beanFullName,
      context: { atomClass, item, options, user },
      fn: 'create',
    });
    // patch data
    const key = this._patchCreateWriteData({ data, atomClassBase });
    // create after
    await this._create_after({ key, atomClass, atomClassBase });
    // ok
    return await this._create_result({ key, atomClass, options, user });
  }

  async _create_result({ key, atomClass, options, user }) {
    const returnItem = options.returnItem;
    if (!returnItem) return key;
    // read
    const optionsRead = {
      containerMode: options.containerMode,
      atomIdMain: options.atomIdMain,
      flowTaskId: options.flowTaskId,
      returnSchema: options.returnSchema,
    };
    const resRead = await this.read({ key, atomClass, options: optionsRead, user });
    if (options.returnSchema) {
      return { key, item: resRead.item, schema: resRead.schema };
    }
    return { key, item: resRead };
  }

  async _create_after({ key, atomClass, atomClassBase }) {
    const { atomId, itemId } = key;
    // save itemId
    if (!atomClassBase.itemOnly) {
      if (itemId !== undefined) {
        await this._update({
          atom: { id: atomId, itemId },
        });
      }
    }
    // notify
    if (!atomClassBase.itemOnly) {
      this._notifyDraftsDrafting(null, atomClass);
    }
  }

  async _add({
    atomClass,
    atom: {
      atomStage = 0,
      itemId,
      atomName,
      roleIdOwner = 0,
      atomStatic = 0,
      atomStaticKey = null,
      atomRevision = 0,
      atomLanguage = null,
      atomCategoryId = 0,
      atomTags = null,
      allowComment = 1,
      atomSimple = 0,
    },
    user,
  }) {
    const atomClassId = atomClass.id;
    const userId = user ? user.id : 0;
    const res = await this.modelAtom.insert({
      atomStage,
      itemId,
      atomClassId,
      atomName,
      atomStatic,
      atomStaticKey,
      atomRevision,
      atomLanguage,
      atomCategoryId,
      atomTags,
      atomSimple,
      allowComment,
      userIdCreated: userId,
      userIdUpdated: userId,
      roleIdOwner,
    });
    return res.insertId;
  }
};
