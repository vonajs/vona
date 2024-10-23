import { BeanBase, Service } from 'vona';

@Service()
export class ServiceMessageClass extends BeanBase {
  async messageClass({ messageClass }: any) {
    return await this.ctx.bean.io.messageClass.get(messageClass);
  }
}
