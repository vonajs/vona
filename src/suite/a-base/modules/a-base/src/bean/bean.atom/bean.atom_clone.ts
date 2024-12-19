import { cast } from 'vona';
import { __ThisModule__ } from '../../.metadata/this.js';
import { BeanAtomBase } from '../bean.atomBase.js';
import { BeanAtomStarLabel } from './bean.atom_starLabel.js';

export class BeanAtomClone extends BeanAtomStarLabel {
  async clone({ key: keyOuter, atomClass: atomClassOuter, options: optionsOuter, roleIdOwner, user }: any) {
    // atomClass
    const { key, atomClass, atomClassBase, options } = await this._prepareKeyAndAtomAndAtomClass({
      key: keyOuter,
      atomClass: atomClassOuter,
      options: optionsOuter,
    });
    // copy
    const keyDraft = await this._copy({
      target: 'clone',
      atomClass,
      srcKey: { atomId: key.atomId },
      srcItem: null,
      destKey: null,
      options,
      roleIdOwner,
      user,
    });
    if (!atomClassBase) this.app.throw(403);
    // ok
    // get atom
    const atom = await this.self.read({ key: keyDraft, atomClass, options, user });
    // draft/formal
    const res = { key: keyDraft, atom };
    if (!atomClassBase!.itemOnly && atom.atomStage === 0) return { draft: res };
    return { formal: res };
  }

  // target: draft/formal/history/clone
  async _copy({ target, atomClass, srcKey, srcItem, destKey, options, roleIdOwner, user }: any) {
    if (!user) user = { id: 0 };
    // atomClassBase
    const atomClassBase = await this.app.bean.atomClass.atomClass(atomClass);
    // atom bean
    const beanInstance: BeanAtomBase = this.app.bean._getBean(atomClassBase.beanFullName as any);
    // srcItem
    if (!srcItem) {
      srcItem = await this.app.bean.atom.read({ key: { atomId: srcKey.atomId }, atomClass, user: undefined });
    }
    if (!srcKey.itemId) {
      if (!atomClassBase.itemOnly) {
        srcKey.itemId = srcItem.itemId;
      } else {
        srcKey.itemId = srcKey.atomId;
      }
    }
    // destItem
    let destItem;
    if (!atomClassBase.itemOnly) {
      destItem = this._copy_prepareDestItem_normal({ target, srcItem, user });
    } else {
      destItem = this._copy_prepareDestItem_itemOnly({ target, srcItem, user });
    }
    // destKey
    if (!destKey) {
      const options: any = {};
      // patch atomIdMain of options
      if (atomClassBase.detail) {
        const atomIdMainField = atomClassBase.fields?.mappings?.atomIdMain;
        options.atomIdMain = srcItem[atomIdMainField!];
      }
      if (target === 'clone') {
        // preferredRole
        // roleIdOwner = roleIdOwner;
      } else {
        roleIdOwner = srcItem.roleIdOwner;
      }
      destKey = await this.create({
        atomClass,
        atomStage: destItem.atomStage,
        roleIdOwner,
        item: null,
        options,
        createOptions: { target, srcItem, destItem },
        user,
      });
    }
    if (!destKey.itemId) {
      if (!atomClassBase.itemOnly) {
        const _item = await this.modelAtom.get({ id: destKey.atomId });
        destKey.itemId = _item!.itemId;
      } else {
        destKey.itemId = destKey.atomId;
      }
    }
    // append destKey
    destItem.atomId = destKey.atomId;
    destItem.itemId = destKey.itemId;
    // update atom fields
    if (!atomClassBase.itemOnly) {
      await this._copy_updateAtomFields({ atomClassBase, target, srcItem, destItem });
    }
    // bean write
    await beanInstance.write({ atomClass, target, key: destKey, item: destItem, options, user });
    // bean copy
    await beanInstance.copy({ atomClass, target, srcKey, srcItem, destKey, destItem, options, user });
    // copy attachments
    if (!atomClassBase.itemOnly) {
      await this._copyAttachments({ atomIdSrc: srcKey.atomId, atomIdDest: destKey.atomId });
    }
    // copy details: itemOnly maybe also has details
    await this.app.bean.detail._copyDetails({
      atomClass,
      target,
      srcKeyAtom: srcKey,
      destKeyAtom: destKey,
      srcAtom: srcItem,
      destAtom: destItem,
      options,
      user,
    });
    // ok
    return destKey;
  }

  async _copy_updateAtomFields({ atomClassBase, target, srcItem, destItem }: any) {
    const data: any = {
      id: destItem.atomId,
      userIdCreated: destItem.userIdCreated,
      userIdUpdated: destItem.userIdUpdated,
      //   see also: atomBase
      // atomName: destItem.atomName,
      // atomLanguage: destItem.atomLanguage,
      // atomCategoryId: destItem.atomCategoryId,
      // atomTags: destItem.atomTags,
      // allowComment: destItem.allowComment,
      atomStatic: destItem.atomStatic,
      atomStaticKey: destItem.atomStaticKey,
      atomRevision: destItem.atomRevision,
      atomSimple: destItem.atomSimple,
      atomStage: destItem.atomStage,
      // atomFlowId: destItem.atomFlowId,
      attachmentCount: destItem.attachmentCount,
      // atomClosed: destItem.atomClosed,
      atomIdDraft: destItem.atomIdDraft,
      atomIdFormal: destItem.atomIdFormal,
      createdAt: destItem.createdAt,
      updatedAt: destItem.updatedAt,
    };
    if (target === 'draft' || target === 'clone') {
      data.atomClosed = destItem.atomClosed;
      data.atomFlowId = destItem.atomFlowId;
    }
    if (target === 'formal' && srcItem.atomStage === 0) {
      const flowStage = atomClassBase.flow?.stage || 'draft';
      if (flowStage === 'draft') {
        data.atomFlowId = destItem.atomFlowId;
      }
    }
    await this.modelAtom.update(data);
  }

  _copy_prepareDestItem_itemOnly({ /* target,*/ srcItem, user: _user }: any) {
    // destItem
    const destItem = Object.assign({}, srcItem, {
      // atomId: destKey.atomId,
      // itemId: destKey.itemId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return destItem;
  }

  _copy_prepareDestItem_normal({ target, srcItem, user }: any) {
    // atomSimple
    const atomSimple = srcItem.atomSimple;
    // atomStage
    let atomStage = this.self.scope.constant.atom.stage[target];
    if (atomStage === undefined) {
      atomStage = atomSimple; // support simple when target='clone'
    }
    // if (target === 'clone') {
    //   atomStage = atomSimple; // support simple
    // }
    // atomClosed
    const atomClosed = 0;
    // atomIdDraft/atomIdFormal
    let atomIdDraft;
    let atomIdFormal;
    let userIdUpdated = srcItem.userIdUpdated;
    let userIdCreated = srcItem.userIdCreated || userIdUpdated;
    let atomFlowId = srcItem.atomFlowId;
    let atomName = srcItem.atomName;
    let atomStatic = srcItem.atomStatic;
    let atomStaticKey = srcItem.atomStaticKey;
    let atomRevision = srcItem.atomRevision;
    const atomLanguage = srcItem.atomLanguage;
    const atomCategoryId = srcItem.atomCategoryId;
    const atomTags = srcItem.atomTags;
    let createdAt = srcItem.atomCreatedAt;
    let updatedAt = srcItem.atomUpdatedAt;
    if (target === 'draft') {
      atomIdDraft = 0;
      atomIdFormal = srcItem.atomStage === 1 ? srcItem.atomId : srcItem.atomIdFormal;
      userIdUpdated = user.id;
      atomFlowId = 0; // will start a new flow instance
      // formal->draft: = srcItem.atomRevision
      if (srcItem.atomStage === 2) {
        // history->draft
        atomRevision = undefined;
      }
    } else if (target === 'formal') {
      if (srcItem.atomStage === 0) {
        // draft->formal
        atomIdDraft = srcItem.atomId;
      } else {
        // history->formal
        atomIdDraft = 0;
      }
      atomIdFormal = 0;
      // history->formal
      if (srcItem.atomStage === 2) {
        atomRevision = undefined;
      }
    } else if (target === 'history') {
      // formal->history
      atomIdDraft = srcItem.atomIdDraft;
      atomIdFormal = srcItem.atomId;
    } else if (target === 'clone') {
      atomIdDraft = 0;
      atomIdFormal = 0;
      userIdUpdated = user.id;
      userIdCreated = user.id;
      atomFlowId = 0;
      atomName = `${srcItem.atomName}-${this.app.text('CloneCopyText')}`;
      atomStatic = 0;
      if (atomStaticKey) {
        atomStaticKey = this.app.bean.util.uuidv4();
      }
      atomRevision = 0;
      createdAt = new Date();
      updatedAt = new Date();
    }
    // destItem
    const destItem = Object.assign({}, srcItem, {
      // atomId: destKey.atomId,
      // itemId: destKey.itemId,
      userIdCreated,
      userIdUpdated,
      atomName,
      atomStatic,
      atomStaticKey,
      atomRevision,
      atomLanguage,
      atomCategoryId,
      atomTags,
      atomSimple,
      atomStage,
      atomFlowId,
      allowComment: srcItem.allowComment,
      attachmentCount: srcItem.attachmentCount,
      atomClosed,
      atomIdDraft,
      atomIdFormal,
      createdAt,
      updatedAt,
    });
    return destItem;
  }

  async _copyAttachments({ atomIdSrc, atomIdDest }: any) {
    // delete old files
    await this.modelFile.delete({ atomId: atomIdDest, mode: 2 });
    // add new files
    const files = await this.modelFile.select({
      where: { atomId: atomIdSrc, mode: 2 },
    });
    for (const file of files) {
      delete cast(file).id;
      file.atomId = atomIdDest;
      await this.modelFile.insert(file);
    }
  }
}
