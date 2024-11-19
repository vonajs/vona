import { BeanBase, Service } from 'vona';

@Service()
export class ServiceAtomState extends BeanBase {
  async getDictDynamic({ atomClass }: any) {
    const data = await this.app.bean.atomState.dynamic_getDict({ atomClass });
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
