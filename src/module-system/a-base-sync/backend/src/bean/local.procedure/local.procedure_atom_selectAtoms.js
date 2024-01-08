module.exports = class Procedure {
  async selectAtoms({ options }) {
    let {
      iid,
      userIdWho,
      // atomClass,
      // atomClassBase,
      // tableName,
      // where,
      // orders,
      // page,
      star,
      label,
      comment,
      file,
      // count,
      stage,
      // language,
      category,
      tag,
      mine,
      resource,
      // resourceLocale,
      // mode,
      // cms,
      // forAtomUser,
      role,
      atomIdMain,
    } = options;
    iid = parseInt(iid);
    userIdWho = parseInt(userIdWho);
    star = parseInt(star);
    label = parseInt(label);
    comment = parseInt(comment);
    file = parseInt(file);
    stage = parseInt(stage);
    category = parseInt(category);
    tag = parseInt(tag);
    mine = parseInt(mine);
    resource = parseInt(resource);
    role = parseInt(role);
    atomIdMain = this.ctx.bean.util.parseIdSafe(atomIdMain);

    options = {
      ...options,
      iid,
      userIdWho,
      star,
      label,
      comment,
      file,
      stage,
      category,
      tag,
      mine,
      resource,
      role,
      atomIdMain,
    };

    // formAction
    let action;
    if (options.formAction) {
      action = this.ctx.bean.atomAction.parseActionCode({
        action: options.formAction,
        atomClass: options.atomClass,
      });
    } else {
      action = 2;
    }

    // draft
    if (stage === 0) {
      // userIdWho must be set
      return await this._selectAtoms_draft({ action, options });
    }
    if (userIdWho === 0) {
      return await this._selectAtoms_0({ action, options });
    }
    // formal/history
    return await this._selectAtoms_formal({ action, options });
  }
};
