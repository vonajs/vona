import { BeanBase } from 'vona';
import { Bean } from 'vona-module-a-bean';

@Bean()
export class BeanBody extends BeanBase {
  async parse() {
    return await this.scope.service.body.parse(false);
  }
}
