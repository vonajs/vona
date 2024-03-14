import { AtomSelectQueryParams, SelectOptionsProSafe } from '../../types.js';
import { LocalProcedureBase } from './local.procedure_base.js';

export class LocalProcedureAtomSelectAtoms extends LocalProcedureBase {
  async selectAtoms({ atomClass: _atomClass, options: _options, user: _user }: AtomSelectQueryParams) {
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
      stage: _stage,
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
    } = _options;
    iid = parseInt(iid);
    userIdWho = parseInt(userIdWho);
    star = parseInt(star);
    label = parseInt(label);
    comment = parseInt(comment);
    file = parseInt(file);
    const stage = parseInt(_stage);
    category = parseInt(category);
    tag = parseInt(tag);
    mine = parseInt(mine);
    resource = parseInt(resource);
    role = parseInt(role);
    atomIdMain = this.ctx.bean.util.parseIdSafe(atomIdMain);

    const options: SelectOptionsProSafe = Object.assign({}, _options, {
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
    }) as SelectOptionsProSafe;

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
      return await this.self._selectAtoms_draft({ options });
    }
    if (userIdWho === 0) {
      return await this.self._selectAtoms_0({ options });
    }
    // formal/history
    return await this.self._selectAtoms_formal({ action, options });
  }
}
