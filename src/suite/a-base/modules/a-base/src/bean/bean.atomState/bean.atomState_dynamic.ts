import { __ThisModule__ } from '../../.metadata/this.js';
import { BeanAtomStateStatic } from './bean.atomState_static.js';

const __atomClassDict = {
  module: 'a-dict',
  atomClassName: 'dict',
};

export class BeanAtomStateDynamic extends BeanAtomStateStatic {
  // status
  get beanStatus() {
    return this.ctx.bean.status.module(__ThisModule__);
  }

  async dynamic_getDictKeyInfo({ atomClass }: any) {
    const atomClassId = await this.ctx.bean.atomClass.getAtomClassId(atomClass);
    const statusName = `atomStateDictKey:${atomClassId}`;
    return await this.beanStatus.get(statusName);
  }

  async dynamic_setDictKeyInfo({ atomClass, dictKey, mode }: any) {
    const atomClassId = await this.ctx.bean.atomClass.getAtomClassId(atomClass);
    const statusName = `atomStateDictKey:${atomClassId}`;
    const dictKeyInfo = { dictKey, mode };
    await this.beanStatus.set(statusName, dictKeyInfo);
  }

  async dynamic_clearDictKeyInfo({ atomClass }: any) {
    const atomClassId = await this.ctx.bean.atomClass.getAtomClassId(atomClass);
    const statusName = `atomStateDictKey:${atomClassId}`;
    await this.beanStatus.set(statusName, null);
  }

  async dynamic_getDict({ atomClass }: any) {
    const dictKeyInfo = await this.dynamic_getDictKeyInfo({ atomClass });
    const dictKey = dictKeyInfo?.dictKey;
    if (!dictKey) return null;
    // get dict
    const dict = await this.ctx.bean.dict.getDict({ dictKey });
    return { dictKey, dict };
  }

  async dynamic_deleteDict({ atomClass }: any) {
    // atom class dict
    const atomClassDict = await this.ctx.bean.atomClass.get(__atomClassDict);
    // get dictKey from status
    const dictKeyInfo = await this.dynamic_getDictKeyInfo({ atomClass });
    const dictKey = dictKeyInfo?.dictKey;
    if (!dictKey) return;
    // delete dict
    const atom = await this.ctx.bean.atom.modelAtom.get({
      atomClassId: atomClassDict.id,
      atomStaticKey: dictKey,
      atomStage: 1,
    });
    if (atom) {
      const keyFormal = { atomId: atom.id };
      await this.ctx.bean.atom.delete({ key: keyFormal, atomClass: atomClassDict });
    }
    // delete dict key
    await this.dynamic_clearDictKeyInfo({ atomClass });
  }

  async dynamic_saveDict({ atomClass, dictItems, dictLocales, mode }: any) {
    // atom class dict
    const atomClassDict = await this.ctx.bean.atomClass.get(__atomClassDict);
    // get dictKey from status
    const dictKeyInfo = await this.dynamic_getDictKeyInfo({ atomClass });
    let dictKey = dictKeyInfo?.dictKey;
    // keyFormal
    let keyFormal;
    if (dictKey) {
      const atom = await this.ctx.bean.atom.modelAtom.get({
        atomClassId: atomClassDict.id,
        atomStaticKey: dictKey,
        atomStage: 1,
      });
      if (!atom) {
        // maybe deleted by other scenes
        dictKey = null;
      } else {
        keyFormal = { atomId: atom.id };
      }
    }
    // write
    if (keyFormal) {
      // write
      await this.ctx.bean.atom.write({
        atomClass: atomClassDict,
        key: keyFormal,
        item: {
          dictMode: mode,
          dictItems: JSON.stringify(dictItems, null, 2),
          dictLocales: JSON.stringify(dictLocales, null, 2),
        },
        user: null,
      });
      // set dictKey
      if (dictKeyInfo.mode !== mode) {
        await this.dynamic_setDictKeyInfo({ atomClass, dictKey, mode });
      }
    } else {
      // write
      const res = await this.ctx.bean.atom.write({
        atomClass: atomClassDict,
        atomStage: 1,
        item: {
          atomName: `Atom State: ${atomClass.module}:${atomClass.atomClassName}`,
          dictItems: JSON.stringify(dictItems, null, 2),
          dictLocales: JSON.stringify(dictLocales, null, 2),
        },
        options: {
          returnItem: true,
        },
        user: null,
      });
      keyFormal = res.key;
      dictKey = res.item.atomStaticKey;
      // resource right
      const roleSystem = await this.ctx.bean.role.parseRoleName({ roleName: 'template.system' });
      await this.ctx.bean.resource.addResourceRole({
        atomId: keyFormal.atomId,
        roleId: roleSystem.id,
      });
      // set dictKey
      await this.dynamic_setDictKeyInfo({ atomClass, dictKey, mode });
    }
  }
}
