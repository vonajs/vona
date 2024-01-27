import { LocalProcedureAtomSelectAtoms0 } from './local.procedure_atom_selectAtoms_0.js';
import { LocalProcedureAtomSelectAtomsDraft } from './local.procedure_atom_selectAtoms_draft.js';
import { LocalProcedureAtomSelectAtomsFormal } from './local.procedure_atom_selectAtoms_formal.js';
import { LocalProcedureBase } from './local.procedure_base.js';

export class LocalProcedureAtomSelectAtoms extends LocalProcedureBase {
  async selectAtoms({ options }: any) {
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
      return await (this as unknown as LocalProcedureAtomSelectAtomsDraft)._selectAtoms_draft({ action, options });
    }
    if (userIdWho === 0) {
      return await (this as unknown as LocalProcedureAtomSelectAtoms0)._selectAtoms_0({ action, options });
    }
    // formal/history
    return await (this as unknown as LocalProcedureAtomSelectAtomsFormal)._selectAtoms_formal({ action, options });
  }
}
