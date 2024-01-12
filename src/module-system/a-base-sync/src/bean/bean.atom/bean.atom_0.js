const moduleInfo = module.info;
module.exports = class Atom extends module.meta.class.BeanModuleBase {
  get atomClass() {
    return this.ctx.bean.atomClass.module(this.moduleName);
  }

  get model() {
    return this.ctx.model.module(moduleInfo.relativeName).atom;
  }

  get modelAtom() {
    return this.ctx.model.module(moduleInfo.relativeName).atom;
  }

  get modelAtomStar() {
    return this.ctx.model.module(moduleInfo.relativeName).atomStar;
  }

  get modelLabel() {
    return this.ctx.model.module(moduleInfo.relativeName).label;
  }

  get modelAtomLabel() {
    return this.ctx.model.module(moduleInfo.relativeName).atomLabel;
  }

  get modelAtomLabelRef() {
    return this.ctx.model.module(moduleInfo.relativeName).atomLabelRef;
  }
  get modelFile() {
    return this.ctx.model.module('a-file').file;
  }

  get sequence() {
    return this.ctx.bean.sequence.module(moduleInfo.relativeName);
  }

  get sqlProcedure() {
    return this.ctx.bean._getBean('a-base.local.procedure');
  }

  // atom other functions

  async get({ atomId }) {
    return await this.modelAtom.get({ id: atomId });
  }

  async flow({ key, atom: { atomFlowId } }) {
    const atomClass = await this.ctx.bean.atomClass.getByAtomId({ atomId: key.atomId });
    await this.modelAtom.update({
      id: key.atomId,
      atomFlowId,
      atomClosed: 0, // open
    });
    // notify
    const item = await this.modelAtom.get({ id: key.atomId });
    const user = { id: item.userIdUpdated };
    this._notifyDraftsDrafting(user, atomClass);
    this._notifyDraftsFlowing(user, atomClass);
  }

  async atomState({ key, atom: { atomState } }) {
    await this.modelAtom.update({
      id: key.atomId,
      atomState,
    });
  }

  async readCount({ key, atom: { readCount = 1 }, user }) {
    await this.modelAtom.query('update aAtom set readCount = readCount + ? where iid=? and id=?', [
      readCount,
      this.ctx.instance.id,
      key.atomId,
    ]);
  }

  async comment({ key, atom: { comment = 1 }, user }) {
    await this.modelAtom.query('update aAtom set commentCount = commentCount + ? where iid=? and id=?', [
      comment,
      this.ctx.instance.id,
      key.atomId,
    ]);
  }

  async attachment({ key, atom: { attachment = 1 }, user }) {
    await this.modelAtom.query('update aAtom set attachmentCount = attachmentCount + ? where iid=? and id=?', [
      attachment,
      this.ctx.instance.id,
      key.atomId,
    ]);
  }

  async stats({ atomIds, user }) {
    const list = [];
    for (const atomId of atomIds) {
      const res = await this.checkRightRead({ atom: { id: atomId }, user, checkFlow: true });
      if (res) {
        list.push({
          id: atomId,
          atomId,
          readCount: res.readCount,
          commentCount: res.commentCount,
          starCount: res.starCount,
        });
      }
    }
    return list;
  }

  async getTableName({ atomClass, atomClassBase, options, mode, user, action, key, count }) {
    const tableNameModes = atomClassBase.tableNameModes || {};
    let tableName;
    if (mode === 'search') {
      tableName = tableNameModes.search || tableNameModes.full || tableNameModes.default || atomClassBase.tableName;
    } else {
      tableName = tableNameModes[mode] || tableNameModes.default || atomClassBase.tableName;
    }
    if (!tableName) return tableName;
    // if function
    if (typeof tableName !== 'string') {
      tableName = await tableName({ ctx: this.ctx, atomClass, atomClassBase, options, mode, user, action, key, count });
    } else {
      // // check if resource
      // //   in this scene, may select atomDisabled=0/1
      // if (atomClassBase.resource) {
      //   const optionsResource = options && options.resource;
      //   if (!optionsResource) {
      //     tableName = `(
      //           select ___a.*,
      //             ___c.atomNameLocale
      //             from ${tableName} ___a
      //             left join aResourceLocale ___c on ___a.atomId=___c.atomId and ___c.locale='${ctx.locale}'
      //         )`;
      //   }
      // }
    }
    // ok
    return tableName;
  }
};
