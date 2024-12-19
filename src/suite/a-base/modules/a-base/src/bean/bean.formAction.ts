import { Bean } from 'vona-module-a-bean';
import { BeanBase } from 'vona';

@Bean()
export class BeanFormAction extends BeanBase {
  async _prepareAtomSchema_getFieldsRight({ mode, formAction, atomClass, user: _user, throwError }: any) {
    // read
    const modeRead = mode === 'view' || mode === 'read';
    // actionBase
    const actionBase = this.app.bean.base.action({
      module: atomClass.module,
      atomClassName: atomClass.atomClassName,
      name: formAction,
    });
    // formMode
    const formMode = actionBase.params?.form?.mode || 'edit';
    const formModeRead = formMode === 'view' || formMode === 'read';
    if (!modeRead && formModeRead) {
      // no right
      if (throwError) this.app.throw(403);
      return null;
    }
    // fieldsRight
    const fieldsRight = actionBase.params?.form?.fieldsRight;
    if (!fieldsRight) {
      if (throwError) this.app.throw(403);
      return null;
    }
    // ok
    return fieldsRight;
  }

  // atomClass: maybe main/detail
  async _prepareAtomSchema({ mode, formAction, atomClass, user, throwError }: any) {
    // fieldsRight
    const fieldsRight = await this._prepareAtomSchema_getFieldsRight({
      mode,
      formAction,
      atomClass,
      user,
      throwError,
    });
    if (!fieldsRight) return null;
    // schema
    const schema = await this.app.bean.fields.parseSchema({
      atomClass,
      atomClassMain: atomClass,
      fieldsRight,
    });
    return { fieldsRight, schema };
  }

  // atomClass: maybe main/detail
  async _prepareAtomSchemaMain({ mode, formActionMain, atomClass, user, throwError }: any) {
    const atomClassBase = await this.app.bean.atomClass.atomClass(atomClass);
    const atomClassMain = atomClassBase?.detail?.atomClassMain;
    // fieldsRight
    const fieldsRight = await this._prepareAtomSchema_getFieldsRight({
      mode,
      formAction: formActionMain,
      atomClass: atomClassMain,
      user,
      throwError,
    });
    if (!fieldsRight) return null;
    // schema
    const schema = await this.app.bean.fields.parseSchema({
      atomClass,
      atomClassMain,
      fieldsRight,
    });
    return { fieldsRight, schema };
  }
}
