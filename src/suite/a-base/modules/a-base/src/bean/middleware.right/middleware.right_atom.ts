import { MiddlewareRight0 } from './middleware.right_0.js';

export class MiddlewareRightAtom extends MiddlewareRight0 {
  async checkAtom(options) {
    // user
    const user = this.ctx.state.user.op;

    // other action (including write/delete)
    let action = options.action;
    // support custom action
    if (['performAction', 'performActionBulk'].includes(action)) {
      action = this.ctx.request.body.action;
    }
    if (!action) {
      throw new Error('Should specify the action in the route meta');
    }

    // prepare request options
    this._checkAtom_prepareSafeRequestOptions();

    // prepare request key
    this._checkAtom_checkRequestKey({ action });

    // atomClass
    const { atomKey, atomClass, atomClassBase } = await this._checkAtom_checkAtomClassExpect({ options });

    // roleIdOwner
    await this._checkAtom_prepareRoleIdOwner({ action, atomKey, atomClass, user });

    // select
    if (action === 'select') {
      const res = await this.ctx.bean.atom.checkRightSelect({
        atomClass,
        user,
        checkFlow: options.checkFlow,
        options: this.ctx.request.body.options,
      });
      if (!res) this.app.throw(403);
      return;
    }

    // actionBase
    const actionBase = this.ctx.bean.base.action({
      module: atomClass.module,
      atomClassName: atomClass.atomClassName,
      name: action,
    });

    // bulk
    const bulk = actionBase.bulk;
    if (bulk) {
      const res = await this.ctx.bean.atom.checkRightActionBulk({
        atomClass,
        action,
        stage: options.stage,
        options: this.ctx.request.body.options,
        user,
      });
      if (!res) this.app.throw(403);
    } else {
      const res = await this.ctx.bean.atom.checkRightAction({
        atom: { id: atomKey.atomId },
        atomClass,
        action,
        stage: options.stage,
        user,
        checkFlow: options.checkFlow,
        options: this.ctx.request.body.options,
      });
      if (!res) this.app.throw(403);
      if (!atomClassBase) this.app.throw(403);
      // itemId
      if (atomClassBase!.itemOnly) {
        atomKey.itemId = atomKey.atomId;
      } else {
        atomKey.itemId = res.itemId;
      }
    }
  }

  _parseAtomClass(atomClass) {
    if (!atomClass) return atomClass;
    if (typeof atomClass === 'string') {
      const [module, atomClassName] = atomClass.split(':');
      return { module, atomClassName };
    }
    return atomClass;
  }

  async _checkAtom_checkAtomClassExpect({ options }: any) {
    // atomClassExpect
    const atomClassExpect = this._parseAtomClass(options.atomClass);
    // atomKey
    const atomKey = this.ctx.request.body.key;
    // atomClass: support itemOnly
    let atomClass = this.ctx.request.body.atomClass;
    if (atomClass) {
      atomClass = await this.ctx.bean.atomClass.get(atomClass);
    } else if (atomKey) {
      atomClass = await this.ctx.bean.atomClass.getByAtomId({ atomId: atomKey.atomId });
    }
    // check if valid & same
    if (!atomClass && !atomClassExpect) {
      // special for select
      if (options.action !== 'select') {
        this.app.throw(403);
      }
    }
    if (atomClass && atomClassExpect && !this.ctx.bean.util.checkIfSameAtomClass(atomClass, atomClassExpect)) {
      this.app.throw(403);
    }
    // neednot check !!atomClassExpect
    if (!atomClass && atomClassExpect) {
      atomClass = await this.ctx.bean.atomClass.get(atomClassExpect);
    }
    // force consistent for safe
    this.ctx.request.body.atomClass = atomClass;
    // atomClassBase
    const atomClassBase = atomClass ? await this.ctx.bean.atomClass.atomClass(atomClass) : null;
    // ok
    return {
      atomKey,
      atomClass,
      atomClassBase,
    };
  }

  _checkAtom_checkRequestKey({ action }: any) {
    const isActionWrite = action === 'write' || action === this.constant.atom.action.write;
    if (isActionWrite) {
      if (!this.ctx.request.body.key) {
        this.ctx.request.body.key = { atomId: 0, itemId: 0 };
      }
    }
  }

  async _checkAtom_prepareRoleIdOwner({ action, atomKey, atomClass, user }: any) {
    const isActionCreate = action === 'create' || action === this.constant.atom.action.create;
    const isActionClone = action === 'clone' || action === this.constant.atom.action.clone;
    const isActionWrite = action === 'write' || action === this.constant.atom.action.write;
    if (isActionCreate || isActionClone) {
      await this._checkAtom_prepareRoleIdOwner_inner({ atomClass, user });
    } else if (isActionWrite) {
      // create delay
      if (atomKey.atomId === 0) {
        await this._checkAtom_prepareRoleIdOwner_inner({ atomClass, user });
      }
    }
  }

  async _checkAtom_prepareRoleIdOwner_inner({ atomClass, user }: any) {
    // roleIdOwner
    const roleIdOwner = await this.ctx.bean.atom.checkRightPreferredRole({
      roleIdOwner: this.ctx.request.body.roleIdOwner,
      atomClass,
      user,
      options: this.ctx.request.body.options,
      disableAuthOpenCheck: true,
    });
    if (roleIdOwner === null) {
      this.app.throw(403);
    }
    if (roleIdOwner) {
      this.ctx.request.body.roleIdOwner = roleIdOwner;
    } else if (this.ctx.request.body.roleIdOwner) {
      delete this.ctx.request.body.roleIdOwner;
    }
  }

  _checkAtom_prepareSafeRequestOptions() {
    let options = this.ctx.request.body.options || {};
    if (!this.ctx.app.meta.isTest) {
      options = Object.assign({}, options, {
        schema: undefined,
        stash: undefined,
        ignoreValidate: undefined,
        ignoreFlow: undefined,
        ignoreRender: undefined,
        ignoreNotEmpty: undefined,
        tableName: undefined,
        createOptions: undefined,
        __createDelayData: undefined,
      });
      this.ctx.bean.stash.reset({ options });
    }
    this.ctx.request.body.options = options;
  }
}
