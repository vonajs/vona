import { FlowNodeStartEventAtom } from 'vona-module-a-flowtask';
import { BeanAtomSimple } from './bean.atom_simple.js';
import { BeanAtomBase } from '../bean.atomBase.js';
import { EntityAtomPro } from '../../index.js';

export class BeanAtomSubmit extends BeanAtomSimple {
  async submit({
    key: keyOuter,
    atomClass: atomClassOuter,
    options: optionsOuter,
    user,
  }: {
    key?;
    atomClass?;
    options?;
    user?;
  }) {
    // atomClass
    const {
      key,
      atom: _atom,
      atomClass,
      atomClassBase,
      options,
    } = await this._prepareKeyAndAtomAndAtomClass({
      key: keyOuter,
      atomClass: atomClassOuter,
      options: optionsOuter,
    });
    // atom
    if (_atom.atomSimple === 1 && _atom.atomStage === 1) {
      // if simple, just return formal, so as for compatible with not simple
      return { formal: { key } };
    }
    if (!atomClassBase) this.app.throw(403);
    // atom bean
    const beanInstance: BeanAtomBase = this.app.bean._getBean(atomClassBase!.beanFullName as any);
    return await beanInstance.submit({ atomClass, key, options, user });
  }

  async _submitBase({ atomClass, key, options, user }: any) {
    // atomClassBase
    const atomClassBase = await this.app.bean.atomClass.atomClass(atomClass);
    // flowStage
    const flowStage = atomClassBase.flow?.stage || 'draft';
    // ignoreFlow only used by draft
    const ignoreFlow = options && options.ignoreFlow;
    const _atom = await this.app.bean.atom.read({ key, user: undefined });
    // check atom flow
    if (!ignoreFlow && flowStage === 'draft') {
      const _nodeBaseBean = this.app.bean._newBean('a-flowtask.flow.node.startEventAtom') as FlowNodeStartEventAtom;
      const flowInstance = await _nodeBaseBean._match({ atom: _atom, userId: _atom.userIdUpdated });
      if (flowInstance) {
        // set atom flow
        const atomFlowId = flowInstance.context._flowId;
        await this.app.bean.atom.flow({ key, atom: { atomFlowId } });
        // ok
        return {
          flow: { id: atomFlowId },
          draft: {
            key,
            atom: {
              atomId: _atom.atomId,
              module: _atom.module,
              atomClassName: _atom.atomClassName,
              atomStage: _atom.atomStage,
            },
          },
        };
      }
    }
    return await this._submitDirect({ atomClass, key, item: _atom, options, user });
  }

  async _submitDirect({ atomClass, key, item, options, user }: any) {
    // atomClassBase
    const atomClassBase = await this.app.bean.atomClass.atomClass(atomClass);
    // flowStage
    const flowStage = atomClassBase.flow?.stage || 'draft';
    // { formal }
    let result = await this._submitDirect_formal({ atomClass, key, item, options, user });
    // check atom flow
    key = result.formal.key;
    item = { ...item, id: key.itemId, atomId: key.atomId, itemId: key.itemId, atomStage: 1 };
    if (flowStage === 'formal') {
      const _nodeBaseBean = this.app.bean._newBean('a-flowtask.flow.node.startEventAtom') as FlowNodeStartEventAtom;
      const flowInstance = await _nodeBaseBean._match({ atom: item, userId: item.userIdUpdated });
      if (flowInstance) {
        // set atom flow
        const atomFlowId = flowInstance.context._flowId;
        await this.app.bean.atom.flow({ key, atom: { atomFlowId } });
        result = {
          flow: { id: atomFlowId },
          formal: result.formal,
        } as any;
      }
    }
    // ok
    return result;
  }

  async _submitDirect_formal({ atomClass, /* key,*/ item, options, user }: any) {
    const atomClassBase = await this.app.bean.atomClass.atomClass(atomClass);
    // formal -> history
    if (item.atomIdFormal) {
      if (atomClassBase.history !== false) {
        await this.self._copy({
          target: 'history',
          atomClass,
          srcKey: { atomId: item.atomIdFormal },
          srcItem: null,
          destKey: null,
          options,
          user,
        });
      }
    }
    // draft -> formal
    const keyFormal = await this.self._copy({
      target: 'formal',
      atomClass,
      srcKey: { atomId: item.atomId },
      srcItem: item,
      destKey: item.atomIdFormal ? { atomId: item.atomIdFormal } : null,
      options,
      user,
    });
    // update draft
    await this.modelAtom.update({
      id: item.atomId,
      atomClosed: 1,
      atomIdFormal: keyFormal.atomId,
    });
    // notify
    this.self._notifyDraftsDrafting(user, atomClass);
    if (item.atomFlowId > 0) {
      this.self._notifyDraftsFlowing(user, atomClass);
    }
    // get formal atom
    const atomFormal = (await this.modelAtom.get({ id: keyFormal.atomId })) as EntityAtomPro;
    if (!atomFormal) this.app.throw(403);
    atomFormal.atomId = atomFormal.id;
    atomFormal.module = atomClass.module;
    atomFormal.atomClassName = atomClass.atomClassName;
    // ok
    return { formal: { key: keyFormal, atom: atomFormal } };
  }
}
