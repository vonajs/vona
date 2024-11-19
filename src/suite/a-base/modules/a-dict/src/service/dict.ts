import { BeanBase, Service } from 'vona';

@Service()
export class ServiceDict extends BeanBase {
  async getDict({ dictKey, user }: any) {
    // check right
    const res = await this.app.bean.dict._prepareDict_load({ dictKey, user, returnDict: false });
    if (!res) this.app.throw(403);
    // get dict
    const dict = await this.app.bean.dict.getDict({ dictKey });
    // short
    return {
      dictKey,
      atomId: dict.atomId,
      description: dict.description,
      dictMode: dict.dictMode,
      _dictItems: dict._dictItems,
    };
  }
}
