import { BeanAtomLineNo } from './bean.atom_lineNo.js';

export class BeanAtomSchema extends BeanAtomLineNo {
  // mode: view/edit
  // atomClass: exluding userFieldsRight (avoid deadloop)
  async _prepareAtomSchema({ mode, atomClass, options, user }) {
    // check if userFieldsRight
    if (atomClass.module === 'a-base' && atomClass.atomClassName === 'userFieldsRight') {
      return await this._prepareAtomSchema_default({ atomClass });
    }
    // if exists
    if (options.schema) {
      return { fieldsRight: null, schema: options.schema };
    }
    // user
    if (!user || user.id === 0) {
      return await this._prepareAtomSchema_default({ atomClass });
    }
    // 1. formAction: before formActionMain, because detail can has its own formAction
    const formAction = options.formAction;
    if (formAction) {
      return await this._prepareAtomSchema_formAction({ mode, formAction, atomClass, user });
    }
    // 2. formActionMain
    const formActionMain = options.formActionMain;
    if (formActionMain) {
      return await this._prepareAtomSchema_formActionMain({ mode, formActionMain, atomClass, user });
    }
    // 3. flowTaskId
    const flowTaskId = options.flowTaskId;
    if (flowTaskId) {
      return await this._prepareAtomSchema_flowTask({ mode, flowTaskId, atomClass, user });
    }
    // 4. atomClass: detail/main
    return await this._prepareAtomSchema_atomClass({ atomClass, user });
  }

  async _prepareAtomSchema_default({ atomClass }) {
    const schema = await this.ctx.bean.atom.schema({ atomClass, schema: null });
    return { fieldsRight: null, schema };
  }

  async _prepareAtomSchema_formAction({ mode, formAction, atomClass, user }) {
    const res = await this.ctx.bean.formAction._prepareAtomSchema({
      mode,
      formAction,
      atomClass,
      user,
      throwError: true,
    });
    if (!res) {
      // return null;
      this.ctx.throw(403);
    }
    return res;
  }

  async _prepareAtomSchema_formActionMain({ mode, formActionMain, atomClass, user }) {
    const res = await this.ctx.bean.formAction._prepareAtomSchemaMain({
      mode,
      formActionMain,
      atomClass,
      user,
      throwError: true,
    });
    if (!res) {
      // return null;
      this.ctx.throw(403);
    }
    return res;
  }

  async _prepareAtomSchema_flowTask({ mode, flowTaskId, atomClass, user }) {
    const res = await this.ctx.bean.flowTask._prepareAtomSchema({
      mode,
      flowTaskId,
      atomClass,
      user,
      throwError: true,
    });
    if (!res) {
      // return null;
      this.ctx.throw(403);
    }
    return res;
  }

  async _prepareAtomSchema_atomClass({ atomClass, user }) {
    const atomClassBase = await this.ctx.bean.atomClass.atomClass(atomClass);
    const atomClassMain = atomClassBase.detail ? atomClassBase.detail.atomClassMain : atomClass;
    const fieldsRight = await this.ctx.bean.fields.getPreferredFieldsRightOfUser({ atomClass: atomClassMain, user });
    if (!fieldsRight) {
      // means using the default base schema
      return await this._prepareAtomSchema_default({ atomClass });
    }
    // parse schema: detail/main
    const schema = await this.ctx.bean.fields.parseSchema({
      atomClass, // detail/main
      fieldsRight,
    });
    return { fieldsRight, schema };
  }

  async schema({ atomClass, schema }) {
    const validator = await this.validator({ atomClass });
    if (!validator) return null;
    let schemaRes = this.ctx.bean.validation.getSchema({
      module: validator.module,
      validator: validator.validator,
      schema,
    });
    if (!schema) {
      schemaRes = Object.assign({}, schemaRes, { isSchemaBase: true });
    }
    return schemaRes;
  }

  async validator({ atomClass }) {
    atomClass = await this.atomClass.get(atomClass);
    return await this.atomClass.validator({ atomClass });
  }
}
