import { BeanBase } from 'vona';
import { Bean } from 'vona-module-a-bean';

@Bean()
export class BeanBodyReq extends BeanBase {
  async parse() {
    return await this.scope.service.bodyReq.parse(false);
  }
}
