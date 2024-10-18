import { BeanBase, Local } from 'vona';

@Local()
export class LocalAtomClass extends BeanBase {
  async validatorSearch({ atomClass }: any) {
    return await this.ctx.bean.atomClass.validatorSearch({ atomClass });
  }

  async checkRightCreate({ atomClass, user }: any) {
    return await this.ctx.bean.atom.checkRightCreate({ atomClass, user });
  }

  async atomClass({ atomClass }: any) {
    return await this.ctx.bean.atomClass.get(atomClass);
  }

  async atomClassesUser({ user }: any) {
    return await this.ctx.bean.atomClass.atomClassesUser({ user });
  }

  async actionsUser({ atomClass, user }: any) {
    return await this.ctx.bean.atomClass.actionsUser({ atomClass, user });
  }
}
