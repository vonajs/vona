import { BeanBase, Local } from '@cabloy/core';
import { AtomClassParams } from '../types.js';

@Local()
export class LocalAtom extends BeanBase {
  async preferredRoles({ atomClass, user }: any) {
    return await this.ctx.bean.atom.preferredRoles({ atomClass, user });
  }

  async preferredRole({ atomClass, user }: any) {
    return await this.ctx.bean.atom.preferredRole({ atomClass, user });
  }

  async preferredRoleId({ atomClass, user }: any) {
    return await this.ctx.bean.atom.preferredRoleId({ atomClass, user });
  }

  async default({ atomClass, roleIdOwner, item, options, user }: any) {
    return await this.ctx.bean.atom.default({ atomClass, roleIdOwner, item, options, user });
  }

  async create({ atomClass, roleIdOwner, item, options, user }: any) {
    return await this.ctx.bean.atom.create({ atomClass, roleIdOwner, item, options, user });
  }

  async atomClass({ key, user: _user }: any): Promise<AtomClassParams | undefined> {
    const atomClass = await this.ctx.bean.atomClass.getByAtomId({ atomId: key.atomId });
    if (!atomClass) return;
    return {
      id: atomClass.id,
      module: atomClass.module,
      atomClassName: atomClass.atomClassName,
    };
  }

  async read({ key, atomClass, options, user }: any) {
    return await this.ctx.bean.atom.read({ key, atomClass, options, user });
  }

  async select({ atomClass, options, user }: any) {
    return await this.ctx.bean.atom.select({ atomClass, options, user });
  }

  async count({ atomClass, options, user }: any) {
    return await this.ctx.bean.atom.count({ atomClass, options, user });
  }

  async write({ key, atomClass, roleIdOwner, item, options, user }: any) {
    return await this.ctx.bean.atom.write({ key, atomClass, roleIdOwner, item, options, user });
  }

  async openDraft({ key, atomClass, user }: any) {
    return await this.ctx.bean.atom.openDraft({ key, atomClass, user });
  }

  async submit({ key, options, user }: any) {
    return await this.ctx.bean.atom.submit({ key, options, user });
  }

  async delete({ key, atomClass, options, user }: any) {
    return await this.ctx.bean.atom.delete({ key, atomClass, options, user });
  }

  async deleteBulk({ atomClass, keys, options, user }: any) {
    return await this.ctx.bean.atom.deleteBulk({ atomClass, keys, options, user });
  }

  async clone({ key, atomClass, roleIdOwner, options, user }: any) {
    return await this.ctx.bean.atom.clone({ key, atomClass, roleIdOwner, options, user });
  }

  async enable({ key, user }: any) {
    return await this.ctx.bean.atom.enable({ key, user });
  }

  async disable({ key, user }: any) {
    return await this.ctx.bean.atom.disable({ key, user });
  }

  async exportBulk({ atomClass, options, fields, user }: any) {
    options = options || {};
    // handle
    return await this._handleActionParams({
      atomClass,
      action: 'exportBulk',
      options,
      fn: async ({ options }) => {
        // exportBulk
        return await this.ctx.bean.atom.exportBulk({ atomClass, options, fields, user });
      },
    });
  }

  async importBulk({ atomClass, options, file, user }: any) {
    options = options || {};
    // handle
    return await this._handleActionParams({
      atomClass,
      action: 'importBulk',
      options,
      fn: async ({ options, params }) => {
        try {
          // prepare file
          if (params.file.mode === 'buffer') {
            const res = await this.ctx.bean.file.loadBuffer({ downloadId: file.downloadId });
            file.fileBuffer = res.buffer;
          }
          // importBulk
          await this.ctx.bean.atom.importBulk({ atomClass, options, file, user });
        } finally {
          // delete file
          await this.ctx.bean.file.delete({ downloadId: file.downloadId });
        }
      },
    });
  }

  async performAction({ key, atomClass, action, item, options, user }: any) {
    options = options || {};
    // handle
    return await this._handleActionParams({
      atomClass,
      action,
      options,
      fn: async ({ options }) => {
        // performAction
        return await this.ctx.bean.atom.performAction({ key, atomClass, action, item, options, user });
      },
    });
  }

  async performActionBulk({ keys, atomClass, action, item, options, user }: any) {
    options = options || {};
    // handle
    return await this._handleActionParams({
      atomClass,
      action,
      options,
      fn: async ({ options }) => {
        // performActionBulk
        return await this.ctx.bean.atom.performActionBulk({ keys, atomClass, action, item, options, user });
      },
    });
  }

  async star({ key, atom, user }: any) {
    return await this.ctx.bean.atom.star({ key, atom, user });
  }

  async readCount({ key, atom, user }: any) {
    return await this.ctx.bean.atom.readCount({ key, atom, user });
  }

  async stats({ atomIds, user }: any) {
    return await this.ctx.bean.atom.stats({ atomIds, user });
  }

  async labels({ key, atom, user }: any) {
    return await this.ctx.bean.atom.labels({ key, atom, user });
  }

  async actions({ key, atomClass, options, basic, user }: any) {
    return await this.ctx.bean.atom.actions({ key, atomClass, options, basic, user });
  }

  async actionsBulk({ atomClass, options, user }: any) {
    return await this.ctx.bean.atom.actionsBulk({ atomClass, options, user });
  }

  async checkRightAction({ key, atomClass, action, stage, user, checkFlow }: any) {
    return await this.ctx.bean.atom.checkRightAction({
      atom: { id: key.atomId },
      atomClass,
      action,
      stage,
      user,
      checkFlow,
    });
  }

  async schema({ atomClass, schema }: any) {
    return await this.ctx.bean.atom.schema({ atomClass, schema });
  }

  async validator({ atomClass }: any) {
    return await this.ctx.bean.atom.validator({ atomClass });
  }

  async moveUp({ key, atomClass, options, user }: any) {
    return await this.ctx.bean.atom.moveUp({ key, atomClass, options, user });
  }

  async moveDown({ key, atomClass, options, user }: any) {
    return await this.ctx.bean.atom.moveDown({ key, atomClass, options, user });
  }

  async _handleActionParams({ atomClass, action, options, fn }: any) {
    // action base
    const actionBase = this.ctx.bean.base.action({
      module: atomClass.module,
      atomClassName: atomClass.atomClassName,
      name: action,
    });
    // params
    const params = actionBase.params || {};
    // check isTest
    if (params.progress && !this.app.meta.isTest) {
      const progressId = await this.ctx.bean.progress.create();
      options = Object.assign({}, options, { progressId });
      // background
      this.ctx.meta.util.runInBackground(async ({ ctx }) => {
        // handle next
        const selfInstance = ctx.bean._newBean(LocalAtom);
        await selfInstance._handleActionParams_transaction({ options, params, fn });
      });
      return { progressId };
    }
    // handle next
    return await this._handleActionParams_transaction({ options, params, fn });
  }

  async _handleActionParams_transaction({ options, params, fn }: any) {
    let res;
    // default is true
    const transaction = params.transaction !== false;
    if (transaction) {
      res = await this.ctx.transaction.begin(async () => {
        return await fn({ options, params });
      });
    } else {
      res = await fn({ options, params });
    }
    // ok
    return res;
  }
}
