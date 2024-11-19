import { ScopeModule } from '../../.metadata/this.js';
import { BeanModuleScopeBase, Cast } from 'vona';
import { BeanAtom } from '../bean.atom.js';

export class BeanAtom0 extends BeanModuleScopeBase<ScopeModule> {
  get self() {
    return Cast<BeanAtom>(this);
  }

  get atomClass() {
    return this.scope._bean.atomClass;
  }

  get model() {
    return this.scope.model.atom;
  }

  get modelAtom() {
    return this.scope.model.atom;
  }

  get modelAtomStar() {
    return this.scope.model.atomStar;
  }

  get modelLabel() {
    return this.scope.model.label;
  }

  get modelAtomLabel() {
    return this.scope.model.atomLabel;
  }

  get modelAtomLabelRef() {
    return this.scope.model.atomLabelRef;
  }
  get modelFile() {
    return this.bean.scope('a-file').model.file;
  }

  get sequence() {
    return this.scope._bean.sequence;
  }

  get sqlProcedure() {
    return this.scope.service.procedure;
  }

  // atom other functions

  async get({ atomId }: any) {
    return await this.modelAtom.get({ id: atomId });
  }

  async flow({ key, atom: { atomFlowId } }) {
    const atomClass = await this.app.bean.atomClass.getByAtomId({ atomId: key.atomId });
    await this.modelAtom.update({
      id: key.atomId,
      atomFlowId,
      atomClosed: 0, // open
    });
    // notify
    const item = await this.modelAtom.get({ id: key.atomId });
    const user = { id: item!.userIdUpdated };
    this.self._notifyDraftsDrafting(user, atomClass);
    this.self._notifyDraftsFlowing(user, atomClass);
  }

  async atomState({ key, atom: { atomState } }) {
    await this.modelAtom.update({
      id: key.atomId,
      atomState,
    });
  }

  async readCount({ key, atom: { readCount = 1 }, user: _user }) {
    await this.modelAtom.update({
      id: key.atomId,
      readCount: this.bean.model.raw('?? + ?', ['readCount', readCount]),
    });
  }

  async comment({ key, atom: { comment = 1 }, user: _user }) {
    await this.modelAtom.update({
      id: key.atomId,
      commentCount: this.bean.model.raw('?? + ?', ['commentCount', comment]),
    });
  }

  async attachment({ key, atom: { attachment = 1 }, user: _user }: any) {
    await this.modelAtom.update({
      id: key.atomId,
      attachmentCount: this.bean.model.raw('?? + ?', ['attachmentCount', attachment]),
    });
  }

  async stats({ atomIds, user }: any) {
    const list: any[] = [];
    for (const atomId of atomIds) {
      const res = await this.self.checkRightRead({
        atom: { id: atomId },
        user,
        checkFlow: true,
      });
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

  async getTableName({ atomClass, atomClassBase, options, mode, user, action, key, count }: any) {
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
}
