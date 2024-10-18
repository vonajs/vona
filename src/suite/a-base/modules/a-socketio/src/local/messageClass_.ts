import { BeanBase, Local } from 'vona';

@Local()
export class LocalMessageClass extends BeanBase {
  async messageClass({ messageClass }: any) {
    return await this.ctx.bean.io.messageClass.get(messageClass);
  }
}
