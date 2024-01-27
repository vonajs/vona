import { BeanBase, Local } from '@cabloy/core';

@Local()
export class LocalAtomState extends BeanBase {
  async getDictDynamic({ atomClass }: any) {
    const data = await this.ctx.bean.atomState.dynamic_getDict({ atomClass });
    if (!data) return null;
    const { dictKey, dict } = data;
    return {
      dictKey,
      dict: {
        dictKey,
        atomId: dict.atomId,
        description: dict.description,
        dictMode: dict.dictMode,
        atomStateMode: 'dynamic',
        _dictItems: dict._dictItems,
      },
    };
  }
}
